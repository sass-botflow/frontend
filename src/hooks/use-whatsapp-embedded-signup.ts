"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  WhatsAppEmbeddedSignupConnectResponse,
  WhatsAppEmbeddedSignupCompleteResponse,
} from "@/lib/backend/types";
import {
  initFacebookSdk,
  isFacebookOrigin,
} from "@/lib/meta/facebook-sdk";
import type { WhatsAppConnectPhase } from "@/lib/meta/whatsapp-types";

interface EmbeddedSignupSession {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
}

interface EmbeddedSignupMessageData {
  type?: string;
  event?: string;
  data?: {
    waba_id?: string;
    phone_number_id?: string;
    business_id?: string;
    error_message?: string;
    current_step?: string;
  };
}

function mapSignupStepToPhase(step?: string): WhatsAppConnectPhase {
  if (!step) return "retrieving_business";
  const normalized = step.toUpperCase();
  if (normalized.includes("PHONE")) return "retrieving_phone";
  return "retrieving_business";
}

export function useWhatsAppEmbeddedSignup(options?: {
  onSuccess?: () => void | Promise<void>;
  onError?: (message: string) => void;
}) {
  const [phase, setPhase] = useState<WhatsAppConnectPhase>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const connectRef = useRef<WhatsAppEmbeddedSignupConnectResponse | null>(null);
  const sessionRef = useRef<EmbeddedSignupSession | null>(null);
  const codeRef = useRef<string | null>(null);
  const listenerAttachedRef = useRef(false);
  const onSuccessRef = useRef(options?.onSuccess);
  const onErrorRef = useRef(options?.onError);

  const loading =
    phase !== "idle" && phase !== "error" && phase !== "connected";

  useEffect(() => {
    onSuccessRef.current = options?.onSuccess;
    onErrorRef.current = options?.onError;
  }, [options?.onSuccess, options?.onError]);

  const fail = useCallback((message: string) => {
    setPhase("error");
    setErrorMessage(message);
    onErrorRef.current?.(message);
  }, []);

  const reset = useCallback(() => {
    setPhase("idle");
    setErrorMessage(null);
    connectRef.current = null;
    sessionRef.current = null;
    codeRef.current = null;
  }, []);

  const finalizeSignup = useCallback(async () => {
    const session = sessionRef.current;
    const code = codeRef.current;
    const connect = connectRef.current;

    if (!session || !code || !connect) return;

    setPhase("saving");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/channels/whatsapp/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          state: connect.state,
          business_id: session.businessId,
          waba_id: session.wabaId,
          phone_number_id: session.phoneNumberId,
        }),
      });

      const body = (await response.json()) as WhatsAppEmbeddedSignupCompleteResponse & {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          body.error ?? body.message ?? "WhatsApp connection failed.",
        );
      }

      sessionRef.current = null;
      codeRef.current = null;
      connectRef.current = null;
      setPhase("connected");
      await onSuccessRef.current?.();
    } catch (err) {
      fail(err instanceof Error ? err.message : "WhatsApp connection failed.");
    }
  }, [fail]);

  const tryFinalize = useCallback(() => {
    if (sessionRef.current && codeRef.current) {
      void finalizeSignup();
    }
  }, [finalizeSignup]);

  const handleEmbeddedSignupMessage = useCallback(
    (event: MessageEvent) => {
      if (!isFacebookOrigin(event.origin)) return;

      let data: EmbeddedSignupMessageData;
      try {
        data = JSON.parse(String(event.data)) as EmbeddedSignupMessageData;
      } catch {
        return;
      }

      if (data.type !== "WA_EMBEDDED_SIGNUP") return;

      if (data.event === "CANCEL") {
        fail(
          data.data?.error_message ??
            "WhatsApp setup was cancelled before it could finish.",
        );
        return;
      }

      if (data.data?.current_step) {
        setPhase(mapSignupStepToPhase(data.data.current_step));
      }

      if (
        data.event === "FINISH" ||
        data.event === "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING" ||
        data.event === "FINISH_ONLY_WABA"
      ) {
        const wabaId = data.data?.waba_id;
        const phoneNumberId = data.data?.phone_number_id;
        const businessId = data.data?.business_id;

        if (!wabaId || !phoneNumberId || !businessId) {
          if (data.event === "FINISH_ONLY_WABA") {
            fail(
              "WhatsApp account created, but no phone number was added. Complete phone setup to continue.",
            );
          }
          return;
        }

        sessionRef.current = { wabaId, phoneNumberId, businessId };
        setPhase("retrieving_phone");
        tryFinalize();
      }
    },
    [fail, tryFinalize],
  );

  useEffect(() => {
    if (listenerAttachedRef.current) return;
    listenerAttachedRef.current = true;
    window.addEventListener("message", handleEmbeddedSignupMessage);
    return () => {
      window.removeEventListener("message", handleEmbeddedSignupMessage);
      listenerAttachedRef.current = false;
    };
  }, [handleEmbeddedSignupMessage]);

  const launchSignup = useCallback(async () => {
    if (loading) return;

    setPhase("connecting");
    setErrorMessage(null);
    sessionRef.current = null;
    codeRef.current = null;

    try {
      const response = await fetch("/api/channels/whatsapp/connect", {
        cache: "no-store",
      });

      const body = (await response.json()) as WhatsAppEmbeddedSignupConnectResponse & {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          body.error ?? body.message ?? "Failed to start WhatsApp signup.",
        );
      }

      if (!body.appId || !body.configId || !body.state) {
        throw new Error("Invalid Embedded Signup session from server.");
      }

      connectRef.current = body;
      await initFacebookSdk(body.appId);

      if (!window.FB) {
        throw new Error("Meta SDK is not available.");
      }

      setPhase("retrieving_business");

      window.FB.login(
        (fbResponse) => {
          if (fbResponse.authResponse?.code) {
            codeRef.current = fbResponse.authResponse.code;
            tryFinalize();
            return;
          }

          if (!sessionRef.current && !codeRef.current) {
            fail("Meta authorization was cancelled.");
          }
        },
        {
          config_id: body.configId,
          response_type: "code",
          override_default_response_type: true,
          state: body.state,
          extras: {
            setup: {},
            sessionInfoVersion: "3",
            featureType: "",
          },
        },
      );
    } catch (err) {
      fail(err instanceof Error ? err.message : "Failed to start WhatsApp signup.");
    }
  }, [fail, tryFinalize]);

  return {
    launchSignup,
    phase,
    loading,
    errorMessage,
    reset,
  };
}
