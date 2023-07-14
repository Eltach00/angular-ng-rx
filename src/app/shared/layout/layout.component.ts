import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { selectFeatureUsername } from 'src/app/store/submit.select';
import { LogOutAction } from 'src/app/store/register.action';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isLogIn: boolean = false;
  date = new Date().getFullYear();
  username = '';

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectFeatureUsername))
      .subscribe(({ loggedIn, username }) => {
        this.isLogIn = loggedIn;
        this.username = username;
      });
  }

  logout() {
    this.authService.logOut();
    this.store.dispatch(LogOutAction());
    this.isLogIn = false;
  }
}
