import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';

const routes: Routes = [{ path: '', component: NewPostPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPostPageRoutingModule {}
