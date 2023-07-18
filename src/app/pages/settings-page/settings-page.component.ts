import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UserUpdateDto } from 'src/app/shared/models/user-update.dto';
import { selectAuth } from 'src/app/store/submit.select';
import { AuthService } from '../auth/auth.service';
import { AuthState } from 'src/app/shared/models/register.state';
import { User } from 'src/app/shared/models/register/succes.register.response';
import { AuthAction } from 'src/app/store/register.action';
@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.fb.group({
      profileUrl: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      bio: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAuth)).subscribe((resp) => {
      this.updateForm(resp);
    });
  }

  onUpdate() {
    const userUpdateDto = new UserUpdateDto(this.accountForm.value);
    this.authService.updateUser(userUpdateDto).subscribe((resp) => {
      this.store.dispatch(AuthAction(resp.user));
    });
  }

  updateForm(resp: AuthState | User) {
    this.accountForm.patchValue({
      profileUrl: resp.image,
      username: resp.username,
      bio: resp.bio,
      email: resp.email,
    });
  }
}
