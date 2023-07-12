export class RegisterDto {
  user: { username: string; password: string; email: string };

  constructor({ username, password, email }) {
    this.user = {
      username,
      password,
      email,
    };
  }
}
