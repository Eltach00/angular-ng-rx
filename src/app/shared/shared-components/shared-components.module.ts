import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { materialModules } from '../material-modules/material.modules';



@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule, ...materialModules
  ],
  exports: [PostComponent]
})
export class SharedComponentsModule { }
