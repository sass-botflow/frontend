export class BackendAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "BackendAuthError";
  }
}

export class BackendApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}
