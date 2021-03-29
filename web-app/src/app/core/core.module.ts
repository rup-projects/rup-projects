import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpService} from './http.service';
import {TokenInterceptor} from './token.interceptor';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
