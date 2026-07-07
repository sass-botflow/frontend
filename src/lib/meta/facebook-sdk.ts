import { META_GRAPH_VERSION } from "@/lib/meta/config";

const FB_SDK_URL = "https://connect.facebook.net/en_US/sdk.js";

let sdkLoadPromise: Promise<void> | null = null;
let initializedAppId: string | null = null;

export function loadFacebookSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    if (window.FB) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${FB_SDK_URL}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Meta SDK.")),
        { once: true },
      );
      return;
    }

    window.fbAsyncInit = () => resolve();

    const script = document.createElement("script");
    script.src = FB_SDK_URL;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.FB) resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Meta SDK."));
    document.body.appendChild(script);
  });

  return sdkLoadPromise;
}

export async function initFacebookSdk(appId: string): Promise<void> {
  await loadFacebookSdk();

  if (!window.FB) {
    throw new Error("Meta SDK failed to initialize.");
  }

  if (initializedAppId === appId) {
    return;
  }

  window.FB.init({
    appId,
    autoLogAppEvents: true,
    xfbml: true,
    cookie: true,
    version: META_GRAPH_VERSION,
  });

  initializedAppId = appId;
}

export function isFacebookOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "facebook.com" || hostname.endsWith(".facebook.com");
  } catch {
    return origin.endsWith("facebook.com");
  }
}
