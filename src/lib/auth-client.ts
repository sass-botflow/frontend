"use client";

import { createAuthClient } from "better-auth/react";
import { getAuthClientOptions } from "@/lib/auth/config";

export const authClient = createAuthClient(getAuthClientOptions());

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
