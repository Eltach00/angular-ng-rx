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
import { Store, select } from '@ngrx/store';
import { registerAction } from 'src/app/store/register.action';
import { selectIsSubmiting } from 'src/app/store/submit.select';

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
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      username: this.userName,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.isSubmitted$ = this.store.pipe(select(selectIsSubmiting));
  }

  onSubmit() {
    this.errors = '';
    if (this.registerForm.invalid) {
      return;
    }
    const data = new RegisterDto(this.registerForm.value);
    this.store.dispatch(registerAction(data));
    this.authService.register(data);
  }
}
