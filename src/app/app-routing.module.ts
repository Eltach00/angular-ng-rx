import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateTestPageComponent } from './pages/state-test-page/state-test-page.component';

const routes: Routes = [{ path: '', component: StateTestPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
