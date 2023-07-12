import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundPage } from '../not-found-page/not-found.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundPage },
];

export const AuthRoutes = RouterModule.forChild(routes);
