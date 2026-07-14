const inFlight = new Map<string, Promise<unknown>>();

export async function withInstanceLock<T>(
  instanceName: string,
  task: () => Promise<T>,
): Promise<T> {
  const current = inFlight.get(instanceName);
  if (current) {
    await current.catch(() => undefined);
  }

  const promise = task().finally(() => {
    if (inFlight.get(instanceName) === promise) {
      inFlight.delete(instanceName);
    }
  });

  inFlight.set(instanceName, promise);
  return promise;
}

export function isInstanceLocked(instanceName: string): boolean {
  return inFlight.has(instanceName);
}
