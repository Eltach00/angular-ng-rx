import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: this.userName,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
