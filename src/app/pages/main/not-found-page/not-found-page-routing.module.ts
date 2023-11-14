import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found-page/not-found.component';

const routes: Routes = [
  {
    path: '**',
    component: NotFoundPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundPageRoutingModule { }
