import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthAction } from 'src/app/store/register.action';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/shared/models/register.dto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../../../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  userName: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  isSubmitted$: Observable<boolean>;
  errors: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: this.userName,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    this.errors = '';
    if (this.registerForm.invalid) {
      return;
    }
    const data: RegisterDTO = this.registerForm.value;
    this.authService.register(data).subscribe({
      next: (resp) => {
        this.store.dispatch(AuthAction(resp.user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errors = err.errors.message;
      },
    });
  }
}
