import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/environments/environment';
import { Urls } from 'src/app/environments/url.enum';
import { AuthDto } from 'src/app/shared/models/auth.dto';
import { RegisterDto } from 'src/app/shared/models/register.dto';
import { SuccessRegisterResponse } from 'src/app/shared/models/register/succes.register.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<SuccessRegisterResponse> {
    return this.http.post<SuccessRegisterResponse>(
      env.baseUrl + Urls.users,
      dto
    );
  }
  auth(dto: AuthDto) {
    console.log(dto);
  }
}
