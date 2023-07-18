import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NotFoundPage } from './pages/not-found-page/not-found.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:slug', component: PostPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'new-post', component: NewPostPageComponent },
  { path: 'new-post/:slug', component: NewPostPageComponent },
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
