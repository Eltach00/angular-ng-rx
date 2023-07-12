import { Component, OnInit } from '@angular/core';
import { AuthAction } from 'src/app/store/register.action';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
