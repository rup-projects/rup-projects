import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudComponent } from '../../commons/components/crud/crud.component';
import { CancelYesDialogComponent } from '../../commons/components/dialogs/cancel-yes-dialog.component';
import { ReadDetailDialogComponent } from '../../commons/components/dialogs/read-detail.dialog.component';
import { UppercaseWords } from '../../commons/pipes/UppercaseWordsPipe';
import { FooterComponent } from './components/footer/footer.component';
import { GridLayoutComponent } from './components/grid-layout/grid-layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from './material.module';
import { ActivityProxyService } from './services/activity-proxy.service';
import { IterationProxyService } from './services/iteration-proxy.service';
import { DtoModelMapper } from './services/mappers/dto-model-mapper';
import { MemberProxyService } from './services/member-proxy.service';
import { PhaseProxyService } from './services/phase-proxy.service';
import { ProjectProxyService } from './services/project-proxy.service';
import { RealizationProxyService } from './services/realization-proxy.service';
import { UseCaseProxyService } from './services/use-case-proxy.service';


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
    FooterComponent,
    GridLayoutComponent,
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
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    FormsModule,
    ReactiveFormsModule,
    UppercaseWords,
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
