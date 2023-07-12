import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutes } from './auth.routing';

@NgModule({
  declarations: [AuthComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutes, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
