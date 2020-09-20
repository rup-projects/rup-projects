import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MemberDialogComponent } from './components/member-dialog/member-dialog.component';
import { MembersManagementComponent } from './components/members-management/members-management.component';
import { MenuComponent } from './components/menu/menu.component';
import { MemberService } from './services/member.service';

@NgModule({
  declarations: [
    AppComponent,
    MembersManagementComponent,
    MemberDialogComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CommonModule,
    HttpClientModule,
    MatMenuModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
