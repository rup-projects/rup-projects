import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {NgModule} from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';


@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule
    ],
    providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
