import { Component, OnInit } from '@angular/core';
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
import { GraphqlService } from 'src/app/shared/services/graphql.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../../auth.styles.scss'],
})
export class AuthComponent implements OnInit {
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
    private store: Store,
    private g: GraphqlService
  ) {
    this.authForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    // this.g.getEuroCountries().subscribe( ({data}) => {
    //   console.log("🚀 ~ file: auth.component.ts:47 ~ AuthComponent ~ this.g.getEuroCountries ~ res:", data)

    // })

    // console.log("🚀 ~ file: auth.component.ts:51 ~ AuthComponent ~ ngOnInit ~  this.g.getEuroCountries():",  this.g.getEuroCountries())
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
