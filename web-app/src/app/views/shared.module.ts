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
import { ActivityService } from '../controllers/activity.service';
import { IterationService } from '../controllers/iteration.service';
import { DtoModelMapper } from '../controllers/mappers/dto-model-mapper';
import { MemberService } from '../controllers/member.service';
import { PhaseService } from '../controllers/phase.service';
import { ProjectService } from '../controllers/project.service';
import { UseCaseService } from '../controllers/use-case.service';
import {MembersViewModel} from '../controllers/view-models/members.view-model';
import {MemberViewModel} from '../controllers/view-models/member.view-model';
import {IterationsViewModel} from '../controllers/view-models/iterations-view-model.service';
import {PhasesViewModel} from '../controllers/view-models/phases-view-model.service';


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
    MemberService,
    ProjectService,
    UseCaseService,
    IterationService,
    PhaseService,
    ActivityService,
    DtoModelMapper,
    MembersViewModel,
    MemberViewModel,
    IterationsViewModel,
    PhasesViewModel
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
