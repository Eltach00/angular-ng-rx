import { SuccessAuthResponse } from 'src/app/shared/models/register/succes.register.response';
import { Component, OnInit } from '@angular/core';
import { AuthAction } from 'src/app/store/register.action';
import { AuthService } from '../auth/auth.service';
import { Store, select } from '@ngrx/store';
import { selectFeatureUsername } from 'src/app/store/submit.select';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {}
}
