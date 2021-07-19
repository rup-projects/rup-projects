import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './commons/core.module';
import {NgModule} from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  resourceTimelinePlugin
]);

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FullCalendarModule, // register FullCalendar with you app
        BrowserModule
    ],
    providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
