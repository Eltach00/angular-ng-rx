import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { HeaderAccountComponent } from './components/header/header.component';
import { AccountPostsComponent } from './components/account-posts/account-posts.component';
import { materialModules } from 'src/app/shared/material-modules/material.modules';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';


@NgModule({
  declarations: [
    AccountPageComponent,
    HeaderAccountComponent,
    AccountPostsComponent,
  ],
  imports: [CommonModule, AccountPageRoutingModule, ...materialModules, SharedComponentsModule],
})
export class AccountPageModule {}
