export interface FacebookAuthResponse {
  code?: string;
}

export interface FacebookLoginResponse {
  authResponse?: FacebookAuthResponse;
  status?: string;
}

export interface FacebookSDK {
  init: (params: {
    appId: string;
    autoLogAppEvents?: boolean;
    xfbml?: boolean;
    version: string;
    cookie?: boolean;
  }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    params: Record<string, unknown>,
  ) => void;
}

declare global {
  interface Window {
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

export {};
