import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'new-post/:slug',
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
      import('./settings-page/settings-page.module').then(
        (m) => m.SettingsPageModule
      ),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./not-found-page/not-found-page.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
