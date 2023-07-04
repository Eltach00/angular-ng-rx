export class RegisterDto {
  username: string;
  password: string;
  email: string;
  constructor({ username, password, email }) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
