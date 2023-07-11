import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { env } from 'src/app/environments/environment';
import { Urls } from 'src/app/environments/url.enum';
import { AuthDto } from 'src/app/shared/models/auth.dto';
import { RegisterDto } from 'src/app/shared/models/register.dto';
import { SuccessAuthResponse } from 'src/app/shared/models/register/succes.register.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<SuccessAuthResponse> {
    return this.http
      .post<SuccessAuthResponse>(env.baseUrl + Urls.users, dto)
      .pipe(
        tap((resp) => {
          this.setToken(resp);
        })
      );
  }

  setToken({ user }: SuccessAuthResponse | null) {
    if (user) {
      const expireTime = new Date(
        new Date().getTime() * 1000
      ); /*need to turn seconds into milliseconds*/
      localStorage.setItem('expiredTime', expireTime.toString());
      localStorage.setItem('authToken', user.token);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return null;
    }

    const expireTime = new Date(localStorage.getItem('expiredTime'));

    if (new Date() > expireTime) {
      this.logOut();
      return null;
    }
    return authToken;
  }

  logOut() {
    localStorage.clear();
  }

  isAuthenficated() {
    return !!this.token;
  }

  auth(dto: AuthDto) {
    return this.http
      .post<SuccessAuthResponse>(env.baseUrl + Urls.login, dto)
      .pipe(
        tap((resp) => {
          this.setToken(resp);
        })
      );
  }

  firstLogIn() {
    return this.http.get<SuccessAuthResponse>(env.baseUrl + Urls.user);
  }
}
