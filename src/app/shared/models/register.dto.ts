export class RegisterDto {
  user: { username: string; password: string; email: string };

  constructor({ username, password, email }) {
    this.user.username = username;
    this.user.password = password;
    this.user.email = email;
  }
}
