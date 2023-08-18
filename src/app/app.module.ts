import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatSnackBarComponent } from './shared/mat-snack-bar/mat-snack-bar.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { HeaderCardComponent } from './pages/post-page/components/header-card/header-card.component';
import { AuthReducer } from './store/register.reducer';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotFoundPage } from './pages/not-found-page/not-found.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';
import { CommentComponent } from './pages/post-page/components/comment/comment.component';
import { PostCommentComponent } from './pages/post-page/components/post-comment/post-comment.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { HeaderAccountComponent } from './pages/account-page/components/header/header.component';
import { AccountPostsComponent } from './pages/account-page/components/account-posts/account-posts.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    StateTestPageComponent,
    LayoutComponent,
    HomeComponent,
    FeedComponent,
    PostComponent,
    TagsComponent,
    MatSnackBarComponent,
    PostPageComponent,
    HeaderCardComponent,
    LoaderComponent,
    NotFoundPage,
    AccountPageComponent,
    NewPostPageComponent,
    CommentComponent,
    PostCommentComponent,
    SettingsPageComponent,
    HeaderAccountComponent,
    AccountPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: AuthReducer }),
    AuthModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    ...materialModules,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
