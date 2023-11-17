import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found-page/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'new-post',
    loadChildren: () =>
      import('./new-post-page/new-post-page.module').then(
        (m) => m.NewPostPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account-page/account-page.module').then(
        (m) => m.AccountPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings-page/settings-page.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'post/:slug',
    loadChildren: () =>
      import('./post-page/post-page.module').then(
        (m) => m.PostPageModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
