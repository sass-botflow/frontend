import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import type { EmbeddedSignupFinishEvent } from "@/lib/meta/graph-api";
import { onboardEmbeddedSignupCustomer } from "@/lib/meta/graph-api";
import { completeWhatsAppEmbeddedSignup } from "@/lib/meta/whatsapp-connection";

const SUPPORTED_FINISH_EVENTS = new Set<EmbeddedSignupFinishEvent>([
  "FINISH",
  "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING",
]);

interface EmbeddedSignupBody {
  code?: string;
  wabaId?: string;
  phoneNumberId?: string;
  businessId?: string;
  finishEvent?: string;
}

export async function POST(request: Request) {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  let body: EmbeddedSignupBody;
  try {
    body = (await request.json()) as EmbeddedSignupBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { code, wabaId, phoneNumberId, businessId, finishEvent } = body;

  if (!code || !wabaId || !phoneNumberId || !businessId || !finishEvent) {
    return NextResponse.json(
      { error: "Missing Embedded Signup session data. Please try connecting again." },
      { status: 400 },
    );
  }

  if (finishEvent === "FINISH_ONLY_WABA") {
    return NextResponse.json(
      {
        error:
          "WhatsApp setup was incomplete. Add and verify a phone number in the Embedded Signup flow.",
      },
      { status: 400 },
    );
  }

  if (!SUPPORTED_FINISH_EVENTS.has(finishEvent as EmbeddedSignupFinishEvent)) {
    return NextResponse.json(
      { error: "WhatsApp Embedded Signup did not complete successfully." },
      { status: 400 },
    );
  }

  try {
    const { accessToken, phone } = await onboardEmbeddedSignupCustomer({
      code,
      wabaId,
      phoneNumberId,
      finishEvent: finishEvent as EmbeddedSignupFinishEvent,
    });

    const integration = await completeWhatsAppEmbeddedSignup(authResult.userId, {
      wabaId,
      phoneNumberId,
      businessId,
      phoneNumber: phone.displayPhoneNumber,
      businessName: phone.verifiedName,
      phoneStatus: phone.verificationStatus,
      accessToken,
    });

    return NextResponse.json({
      integration,
      message: "WhatsApp Business connected successfully.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "WhatsApp Embedded Signup failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
