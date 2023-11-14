import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPage } from './not-found-page/not-found.component';


@NgModule({
  declarations: [NotFoundPage],
  imports: [
    CommonModule,
    NotFoundPageRoutingModule
  ]
})
export class NotFoundPageModule { }
