export interface ErrorRegisterResponse {
  errors: Errors;
}

export interface Errors {
  email: string[];
  username: string[];
}
