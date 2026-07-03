export const META_GRAPH_VERSION = "v21.0";

export function getMetaAppId() {
  const appId = process.env.META_APP_ID ?? process.env.NEXT_PUBLIC_META_APP_ID;
  if (!appId) {
    throw new Error("META_APP_ID is not configured.");
  }
  return appId;
}

export function getMetaAppSecret() {
  const secret = process.env.META_APP_SECRET;
  if (!secret) {
    throw new Error("META_APP_SECRET is not configured.");
  }
  return secret;
}

export function getMetaEmbeddedSignupConfigId() {
  const configId =
    process.env.META_EMBEDDED_SIGNUP_CONFIG_ID ??
    process.env.NEXT_PUBLIC_META_EMBEDDED_SIGNUP_CONFIG_ID;
  if (!configId) {
    throw new Error("META_EMBEDDED_SIGNUP_CONFIG_ID is not configured.");
  }
  return configId;
}

export interface MetaEmbeddedSignupPublicConfig {
  appId: string;
  configId: string;
  graphVersion: string;
}

export function getMetaEmbeddedSignupPublicConfig(): MetaEmbeddedSignupPublicConfig {
  return {
    appId: getMetaAppId(),
    configId: getMetaEmbeddedSignupConfigId(),
    graphVersion: META_GRAPH_VERSION,
  };
}
