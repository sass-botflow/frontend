"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MetaEmbeddedSignupPublicConfig } from "@/lib/meta/config";

const FB_SDK_URL = "https://connect.facebook.net/en_US/sdk.js";

interface EmbeddedSignupSession {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
  finishEvent: string;
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

function isFacebookOrigin(origin: string) {
  return origin.endsWith("facebook.com");
}

function loadFacebookSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.FB) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${FB_SDK_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Meta SDK.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = FB_SDK_URL;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Meta SDK."));
    document.body.appendChild(script);
  });
}

export function useWhatsAppEmbeddedSignup(options?: {
  onSuccess?: () => void | Promise<void>;
  onError?: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const configRef = useRef<MetaEmbeddedSignupPublicConfig | null>(null);
  const sessionRef = useRef<EmbeddedSignupSession | null>(null);
  const codeRef = useRef<string | null>(null);
  const listenerAttachedRef = useRef(false);
  const onSuccessRef = useRef(options?.onSuccess);
  const onErrorRef = useRef(options?.onError);

  useEffect(() => {
    onSuccessRef.current = options?.onSuccess;
    onErrorRef.current = options?.onError;
  }, [options?.onSuccess, options?.onError]);

  const finalizeSignup = useCallback(async () => {
    const session = sessionRef.current;
    const code = codeRef.current;
    const config = configRef.current;

    if (!session || !code || !config) return;

    setLoading(true);
    try {
      const response = await fetch("/api/integrations/whatsapp/embedded-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          wabaId: session.wabaId,
          phoneNumberId: session.phoneNumberId,
          businessId: session.businessId,
          finishEvent: session.finishEvent,
        }),
      });

      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "WhatsApp connection failed.");
      }

      sessionRef.current = null;
      codeRef.current = null;
      await onSuccessRef.current?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "WhatsApp connection failed.";
      onErrorRef.current?.(message);
    } finally {
      setLoading(false);
    }
  }, []);

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
        const cancelMessage =
          data.data?.error_message ??
          "WhatsApp setup was cancelled before it could finish.";
        onErrorRef.current?.(cancelMessage);
        setLoading(false);
        return;
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
            onErrorRef.current?.(
              "WhatsApp account created, but no phone number was added. Complete phone setup to continue.",
            );
            setLoading(false);
          }
          return;
        }

        sessionRef.current = {
          wabaId,
          phoneNumberId,
          businessId,
          finishEvent: data.event,
        };
        tryFinalize();
      }
    },
    [tryFinalize],
  );

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const response = await fetch("/api/integrations/whatsapp/config");
        const body = (await response.json()) as MetaEmbeddedSignupPublicConfig & {
          error?: string;
        };
        if (!response.ok) {
          throw new Error(body.error ?? "Meta Embedded Signup is not configured.");
        }

        if (cancelled) return;
        configRef.current = body;

        await loadFacebookSdk();
        if (cancelled) return;

        window.fbAsyncInit = () => {
          window.FB?.init({
            appId: body.appId,
            autoLogAppEvents: true,
            xfbml: true,
            cookie: true,
            version: body.graphVersion,
          });
          setReady(true);
        };

        if (window.FB) {
          window.FB.init({
            appId: body.appId,
            autoLogAppEvents: true,
            xfbml: true,
            cookie: true,
            version: body.graphVersion,
          });
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setConfigError(
            err instanceof Error ? err.message : "Meta Embedded Signup is not configured.",
          );
        }
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (listenerAttachedRef.current) return;
    listenerAttachedRef.current = true;
    window.addEventListener("message", handleEmbeddedSignupMessage);
    return () => {
      window.removeEventListener("message", handleEmbeddedSignupMessage);
      listenerAttachedRef.current = false;
    };
  }, [handleEmbeddedSignupMessage]);

  const launchSignup = useCallback(() => {
    const config = configRef.current;
    if (!config || !window.FB) {
      onErrorRef.current?.("Meta SDK is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    sessionRef.current = null;
    codeRef.current = null;

    window.FB.login(
      (response) => {
        if (response.authResponse?.code) {
          codeRef.current = response.authResponse.code;
          tryFinalize();
          return;
        }

        setLoading(false);
        onErrorRef.current?.("Meta authorization was cancelled.");
      },
      {
        config_id: config.configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          sessionInfoVersion: "3",
          featureType: "",
        },
      },
    );
  }, [tryFinalize]);

  return {
    launchSignup,
    loading,
    ready,
    configError,
  };
}
