import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/shared/models/register.state';
import { selectAuth } from 'src/app/store/submit.select';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnInit {
  user: AuthState;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.pipe(select(selectAuth)).subscribe((user) => {
      this.user = user;
    });
  }
}
