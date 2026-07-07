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
import { parseJsonResponse } from "@/lib/api/parse-json-response";

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
    wabaId?: string;
    phone_number_id?: string;
    phoneNumberId?: string;
    business_id?: string;
    businessId?: string;
    error_message?: string;
    errorMessage?: string;
    current_step?: string;
  };
}

const FINISH_EVENTS = new Set([
  "FINISH",
  "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING",
  "FINISH_ONLY_WABA",
  "FINISH_OBO_MIGRATION",
  "FINISH_GRANT_ONLY_API_ACCESS",
]);

const SESSION_FALLBACK_MS = 3_000;
const FLOW_TIMEOUT_MS = 120_000;

function mapSignupStepToPhase(step?: string): WhatsAppConnectPhase {
  if (!step) return "retrieving_business";
  const normalized = step.toUpperCase();
  if (normalized.includes("PHONE")) return "retrieving_phone";
  return "retrieving_business";
}

function readSessionFromMessage(
  data: EmbeddedSignupMessageData,
): EmbeddedSignupSession | null {
  const payload = data.data;
  if (!payload) return null;

  const wabaId = payload.waba_id ?? payload.wabaId;
  const phoneNumberId = payload.phone_number_id ?? payload.phoneNumberId;
  const businessId = payload.business_id ?? payload.businessId ?? wabaId;

  if (!wabaId || !phoneNumberId || !businessId) {
    return null;
  }

  return { wabaId, phoneNumberId, businessId };
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
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalizeStartedRef = useRef(false);
  const listenerAttachedRef = useRef(false);
  const onSuccessRef = useRef(options?.onSuccess);
  const onErrorRef = useRef(options?.onError);

  const loading =
    phase !== "idle" && phase !== "error" && phase !== "connected";

  useEffect(() => {
    onSuccessRef.current = options?.onSuccess;
    onErrorRef.current = options?.onError;
  }, [options?.onSuccess, options?.onError]);

  const clearTimers = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (flowTimeoutRef.current) {
      clearTimeout(flowTimeoutRef.current);
      flowTimeoutRef.current = null;
    }
  }, []);

  const fail = useCallback(
    (message: string) => {
      clearTimers();
      finalizeStartedRef.current = false;
      setPhase("error");
      setErrorMessage(message);
      onErrorRef.current?.(message);
    },
    [clearTimers],
  );

  const reset = useCallback(() => {
    clearTimers();
    finalizeStartedRef.current = false;
    setPhase("idle");
    setErrorMessage(null);
    connectRef.current = null;
    sessionRef.current = null;
    codeRef.current = null;
  }, [clearTimers]);

  const finalizeSignup = useCallback(async () => {
      const code = codeRef.current;
      const connect = connectRef.current;

      if (!code || !connect) return;
      if (finalizeStartedRef.current) return;

      finalizeStartedRef.current = true;
      clearTimers();
      setPhase("saving");
      setErrorMessage(null);

      try {
        const response = await fetch("/api/channels/whatsapp/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            state: connect.state,
          }),
        });

        const body = await parseJsonResponse<
          WhatsAppEmbeddedSignupCompleteResponse & {
            error?: string;
            message?: string;
          }
        >(response);

        if (!response.ok) {
          throw new Error(
            body.error ?? body.message ?? "WhatsApp connection failed.",
          );
        }

        sessionRef.current = null;
        codeRef.current = null;
        connectRef.current = null;
        finalizeStartedRef.current = false;
        setPhase("connected");
        await onSuccessRef.current?.();
      } catch (err) {
        finalizeStartedRef.current = false;
        fail(err instanceof Error ? err.message : "WhatsApp connection failed.");
      }
  }, [clearTimers, fail]);

  const scheduleCodeFallback = useCallback(() => {
    if (fallbackTimerRef.current) return;

    fallbackTimerRef.current = setTimeout(() => {
      fallbackTimerRef.current = null;
      if (codeRef.current && connectRef.current) {
        void finalizeSignup();
      }
    }, SESSION_FALLBACK_MS);
  }, [finalizeSignup]);

  const tryFinalize = useCallback(() => {
    if (!codeRef.current) {
      scheduleCodeFallback();
      return;
    }
    void finalizeSignup();
  }, [finalizeSignup, scheduleCodeFallback]);

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
            data.data?.errorMessage ??
            "WhatsApp setup was cancelled before it could finish.",
        );
        return;
      }

      if (data.event === "ERROR") {
        fail(
          data.data?.error_message ??
            data.data?.errorMessage ??
            "Meta reported an error during WhatsApp setup.",
        );
        return;
      }

      if (data.data?.current_step) {
        setPhase(mapSignupStepToPhase(data.data.current_step));
      }

      if (data.event && FINISH_EVENTS.has(data.event)) {
        if (data.event === "FINISH_ONLY_WABA") {
          fail(
            "WhatsApp account created, but no phone number was added. Add a phone number in Meta and try again.",
          );
          return;
        }

        const session = readSessionFromMessage(data);
        if (session) {
          sessionRef.current = session;
          setPhase("retrieving_phone");
        }

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

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const launchSignup = useCallback(async () => {
    if (loading) return;

    clearTimers();
    finalizeStartedRef.current = false;
    setPhase("connecting");
    setErrorMessage(null);
    sessionRef.current = null;
    codeRef.current = null;

    flowTimeoutRef.current = setTimeout(() => {
      fail(
        "WhatsApp setup timed out. Close the Meta popup, wait a few seconds, and try Reconnect again.",
      );
    }, FLOW_TIMEOUT_MS);

    try {
      const response = await fetch("/api/channels/whatsapp/connect", {
        cache: "no-store",
      });

      const body = await parseJsonResponse<
        WhatsAppEmbeddedSignupConnectResponse & {
          error?: string;
          message?: string;
        }
      >(response);

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

          if (fbResponse.status === "not_authorized") {
            fail("Meta authorization was not granted. Please approve all permissions.");
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
            featureType: "whatsapp_embedded_signup",
          },
        },
      );
    } catch (err) {
      fail(err instanceof Error ? err.message : "Failed to start WhatsApp signup.");
    }
  }, [clearTimers, fail, loading, tryFinalize]);

  return {
    launchSignup,
    phase,
    loading,
    errorMessage,
    reset,
  };
}
