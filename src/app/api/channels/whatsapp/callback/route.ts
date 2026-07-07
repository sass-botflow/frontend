import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const path = query
    ? `/dashboard/channels?${query}`
    : "/dashboard/channels";
  return NextResponse.redirect(new URL(path, request.url));
}
