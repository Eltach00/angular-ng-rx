import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './shared/layout/layout.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { materialModules } from './shared/material-modules/material.modules';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

import { AuthReducer } from './store/register.reducer';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotFoundPage } from './pages/main/not-found-page/not-found.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, LoaderComponent, NotFoundPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: AuthReducer }),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ...materialModules,
    HttpClientModule,
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
