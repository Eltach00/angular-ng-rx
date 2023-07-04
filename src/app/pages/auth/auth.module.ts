import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { registerReducer } from 'src/app/store/register.reducer';

const routes: Route[] = [
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [AuthComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', registerReducer),
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
