import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudComponent } from '../../commons/components/crud/crud.component';
import { CancelYesDialogComponent } from '../../commons/components/dialogs/cancel-yes-dialog.component';
import { ReadDetailDialogComponent } from '../../commons/components/dialogs/read-detail.dialog.component';
import { UppercaseWords } from '../../commons/pipes/UppercaseWordsPipe';
import { FooterComponent } from './layout/footer/footer.component';
import { GridLayoutComponent } from './layout/grid-layout/grid-layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MaterialModule } from './material.module';
import { ActivityProxyService } from '../controllers/activity-proxy.service';
import { IterationProxyService } from '../controllers/iteration-proxy.service';
import { DtoModelMapper } from '../controllers/mappers/dto-model-mapper';
import { MemberProxyService } from '../controllers/member-proxy.service';
import { PhaseProxyService } from '../controllers/phase-proxy.service';
import { ProjectService } from '../controllers/project.service';
import { RealizationProxyService } from '../controllers/realization-proxy.service';
import { UseCaseProxyService } from '../controllers/use-case-proxy.service';


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
    ProjectService,
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
