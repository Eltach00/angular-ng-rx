import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
];

export const AuthRoutes = RouterModule.forChild(routes);
