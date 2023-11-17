import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CommonModule, SettingsPageRoutingModule, ReactiveFormsModule],
})
export class SettingsPageModule {}
