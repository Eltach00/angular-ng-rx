import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterDto } from 'src/app/shared/models/register.dto';
import { Store } from '@ngrx/store';
import { registerAction } from 'src/app/store/register.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
  submitted = false;
  errors: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
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
    const data = new RegisterDto(this.registerForm.value);
    this.store.dispatch(registerAction(data));
    this.submitted = true;
    // this.authService.register(this.registerForm.value as RegisterDto);
    this.submitted = false;
  }
}
