import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { materialModules } from 'src/app/shared/material-modules/material.modules';
import { HomeComponent } from './pages/home-page/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { TagsComponent } from './components/tags/tags.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';

@NgModule({
  declarations: [HomeComponent, FeedComponent, TagsComponent],
  imports: [CommonModule, HomeRoutingModule, ...materialModules, SharedComponentsModule],
})
export class HomeModule {}
