import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { AuthDto } from 'src/app/shared/models/auth.dto';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthAction } from 'src/app/store/register.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../../auth.styles.scss'],
})
export class AuthComponent {
  authForm: FormGroup;
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.authForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const data = new AuthDto(this.authForm.value);
    this.authService.auth(data).subscribe({
      next: (resp) => {
        this.store.dispatch(AuthAction(resp.user));
        this.router.navigate(['/']);
      },
    });
  }
}
