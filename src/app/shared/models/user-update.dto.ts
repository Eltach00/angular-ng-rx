import { User } from './register/succes.register.response';

export class UserUpdateDto {
  user: UserUpdate;
  constructor({ bio, email, image, password, token, username }: UserUpdate) {
    this.user = { bio, email, image, password, token, username };
  }
}

export interface UserUpdate extends User {
  password: string;
}
