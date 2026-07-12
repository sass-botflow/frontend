import { Suspense } from "react";
import { InstagramOAuthCompletePage } from "./instagram-oauth-complete";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InstagramOAuthCompletePage />
    </Suspense>
  );
}
