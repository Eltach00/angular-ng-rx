import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthAction } from 'src/app/store/register.action';
import { selectFeatureUsername } from 'src/app/store/submit.select';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isLogIn: boolean = false;
  date = new Date().getFullYear();
  username = '';
  profileUrl = '';
  isActive: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoaderActive.subscribe((isActive) => {
      isActive ? (this.isActive = true) : (this.isActive = false);
    });

    this.loaderService.increaseLoader();
    this.store
      .pipe(select(selectFeatureUsername))
      .subscribe(({ username, profileUrl, loggedIn }) => {
        if (loggedIn) {
          this.isLogIn = loggedIn;
          this.username = username;
          this.profileUrl = profileUrl;
        }
        this.loaderService.decreaseLoader();
      });

    if (this.authService.isAuthenficated()) {
      this.loaderService.increaseLoader();
      this.authService
        .getUser()
        .pipe(
          finalize(() => {
            this.loaderService.decreaseLoader();
          })
        )
        .subscribe({
          next: (resp) => {
            this.store.dispatch(AuthAction(resp.user));
            this.username = resp.user.username;
            this.profileUrl = resp.user.image;
          },
          error: () => {
            this.authService.logOut();
          },
        });
    }
  }

  logout() {
    this.authService.logOut();
    this.router
      .navigateByUrl('/HomeComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/']);
      });
    this.isLogIn = false;
  }
}
