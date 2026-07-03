import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const path = query
    ? `/settings/channels?${query}`
    : "/settings/channels";
  return NextResponse.redirect(new URL(path, request.url));
}
