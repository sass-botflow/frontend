import { NextRequest, NextResponse } from "next/server";
import {
  buildBackendBetterAuthUrl,
  buildProxyRequestHeaders,
  buildProxyResponseHeaders,
} from "@/lib/auth/proxy";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyBetterAuth(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const targetUrl = buildBackendBetterAuthUrl(path, request.nextUrl.search);
  const headers = buildProxyRequestHeaders(request);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(targetUrl, init);
  const responseHeaders = buildProxyResponseHeaders(upstream.headers);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyBetterAuth(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyBetterAuth(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyBetterAuth(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyBetterAuth(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyBetterAuth(request, context);
}
