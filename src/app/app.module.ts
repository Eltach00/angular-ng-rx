import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StateTestPageComponent } from './pages/state-test-page/state-test-page.component';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FeedComponent } from './pages/home/components/feed/feed.component';
import { PostComponent } from './pages/home/components/post/post.component';

import { TagsComponent } from './pages/home/components/tags/tags.component';
import { materialModules } from './shared/material-modules/material.modules';

@NgModule({
  declarations: [
    AppComponent,
    StateTestPageComponent,
    LayoutComponent,
    HomeComponent,
    FeedComponent,
    PostComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    AuthModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
