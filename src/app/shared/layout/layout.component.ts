import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { LogOutAction } from 'src/app/store/register.action';
import { AuthAction } from 'src/app/store/register.action';
import { selectFeatureUsername } from 'src/app/store/submit.select';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isLogIn: boolean = false;
  date = new Date().getFullYear();
  username = '';
  loading: boolean = true;
  profileUrl = '';
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectFeatureUsername))
      .subscribe(({ username, profileUrl }) => {
        if (this.isLogIn) {
          this.username = username;
          this.profileUrl = profileUrl;
        }
      });
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.firstLogIn().subscribe({
        next: (resp) => {
          this.store.dispatch(AuthAction(resp.user));
          this.username = resp.user.username;
          this.profileUrl = resp.user.image;
          this.isLogIn = true;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.authService.logOut();
        },
      });
    } else {
      this.loading = false;
    }
  }

  logout() {
    this.authService.logOut();
    this.store.dispatch(LogOutAction());
    this.isLogIn = false;
  }
}
