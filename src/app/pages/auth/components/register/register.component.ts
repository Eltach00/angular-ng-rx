import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterDto } from 'src/app/shared/models/register.dto';
import { Store } from '@ngrx/store';
import { AuthAction } from 'src/app/store/register.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../auth.styles.scss'],
})
export class RegisterComponent implements OnInit {
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

  ngOnInit(): void {}

  onSubmit() {
    this.errors = '';
    if (this.registerForm.invalid) {
      return;
    }
    const data = new RegisterDto(this.registerForm.value);
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
