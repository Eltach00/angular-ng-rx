import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { AuthDto } from 'src/app/shared/models/auth.dto';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authForm: FormGroup<{
    password: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.submitted = true;
    this.authService.auth(this.authForm.value as AuthDto);
    this.submitted = false;
  }
}
