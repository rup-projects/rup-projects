import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CancelYesDialogComponent} from './dialogs/cancel-yes-dialog.component';
import {CrudComponent} from './components/crud/crud.component';
import {MaterialModule} from './material.module';
import {UppercaseWords} from './pipes/UppercaseWordsPipe';
import {MemberProxyService} from './services/member-proxy.service';
import {ProjectProxyService} from './services/project-proxy.service';
import {UseCaseProxyService} from './services/use-case-proxy.service';
import {IterationProxyService} from './services/iteration-proxy.service';
import {PhaseProxyService} from './services/phase-proxy.service';
import {MenuComponent} from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import {ReadDetailDialogComponent} from './dialogs/read-detail.dialog.component';
import {ActivityProxyService} from './services/activity-proxy.service';
import {RealizationProxyService} from './services/realization-proxy.service';
import {DtoModelMapper} from './services/mappers/dto-model-mapper';


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
    MemberProxyService,
    ProjectProxyService,
    UseCaseProxyService,
    IterationProxyService,
    PhaseProxyService,
    ActivityProxyService,
    RealizationProxyService,
    DtoModelMapper
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
