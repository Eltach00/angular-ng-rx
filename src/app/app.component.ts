import { AuthService } from 'src/app/pages/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthAction } from './store/register.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-blog';
  loading = true;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.firstLogIn().subscribe({
        next: (resp) => {
          this.loading = false;
          this.store.dispatch(AuthAction(resp.user));
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
}
