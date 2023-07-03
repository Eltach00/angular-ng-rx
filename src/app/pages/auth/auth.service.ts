import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDto } from 'src/app/shared/models/auth.dto';
import { RegisterDto } from 'src/app/shared/models/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(dto: RegisterDto) {
    console.log(dto);
  }
  auth(dto: AuthDto) {
    console.log(dto);
  }
}
