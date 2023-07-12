import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NotFoundPage } from './pages/not-found-page/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:slug', component: PostPageComponent },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
