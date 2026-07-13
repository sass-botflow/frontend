/** MVP: allow landing CTAs to open the dashboard without Clerk sign-in. */
export function isOpenAccessEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_OPEN_ACCESS !== "false";
}

export function getStartAppPath(): string {
  return isOpenAccessEnabled() ? "/dashboard" : "/sign-up";
}

export function getSignInPath(): string {
  return isOpenAccessEnabled() ? "/dashboard" : "/sign-in";
}
