import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NotFoundPage } from './pages/not-found-page/not-found.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:slug', component: PostPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'new-post', component: NewPostPageComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
