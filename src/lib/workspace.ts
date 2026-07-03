/**
 * Resolves the active workspace for the authenticated user.
 * Today each Clerk user maps to one workspace; extend when multi-workspace ships.
 */
export function resolveWorkspaceId(userId: string): string {
  return userId;
}
