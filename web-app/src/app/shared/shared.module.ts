import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CancelYesDialogComponent} from './dialogs/cancel-yes-dialog.component';
import {CrudComponent} from './components/crud/crud.component';
import {MaterialModule} from './material.module';
import {UppercaseWords} from './pipes/UppercaseWordsPipe';
import {MemberService} from './services/member.service';
import {ProjectService} from './services/project.service';
import {UseCaseService} from './services/use-case.service';
import {IterationService} from './services/iteration.service';
import {PhaseService} from './services/phase.service';
import {MenuComponent} from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import {ReadDetailDialogComponent} from './dialogs/read-detail.dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    UppercaseWords,
    MenuComponent,
    ReadDetailDialogComponent

  ],
  providers: [
    MemberService,
    ProjectService,
    UseCaseService,
    IterationService,
    PhaseService
  ],
  exports: [
    MenuComponent,
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    UppercaseWords,
    MenuComponent,
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UppercaseWords,
    ReadDetailDialogComponent
  ]
})
export class SharedModule {
}
