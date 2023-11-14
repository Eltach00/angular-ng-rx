import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPostPageRoutingModule } from './new-post-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';


@NgModule({
  declarations: [NewPostPageComponent],
  imports: [
    CommonModule,
    NewPostPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class NewPostPageModule { }
