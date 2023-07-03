import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterDto } from 'src/app/shared/models/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;

  userName: FormControl = new FormControl('', Validators.required);
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
    this.registerForm = this.fb.group({
      username: this.userName,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.submitted = true;
    this.authService.register(this.registerForm.value as RegisterDto);
    this.submitted = false;
  }
}
