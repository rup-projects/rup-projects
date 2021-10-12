import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudComponent } from '../../commons/components/crud/crud.component';
import { CancelYesDialogComponent } from '../../commons/components/dialogs/cancel-yes-dialog.component';
import { ReadDetailDialogComponent } from '../../commons/components/dialogs/read-detail.dialog.component';
import { ShowErrorComponent } from '../../commons/components/show-error/show-error.component';
import { UppercaseWords } from '../../commons/pipes/UppercaseWordsPipe';
import { ActivityService } from '../controllers/activity.service';
import { IterationService } from '../controllers/iteration.service';
import { MemberService } from '../controllers/member.service';
import { PhaseService } from '../controllers/phase.service';
import { ProjectService } from '../controllers/project.service';
import { UseCaseService } from '../controllers/use-case.service';
import { ActivityViewModel } from '../controllers/view-models/activity-view-model';
import { IterationViewModel } from '../controllers/view-models/iteration-view-model';
import { IterationsViewModel } from '../controllers/view-models/iterations-view-model';
import { PhasesViewModel } from '../controllers/view-models/phases-view-model';
import { RealizationsViewModel } from '../controllers/view-models/realizations-view-model';
import { FooterComponent } from './layout/footer/footer.component';
import { GridLayoutComponent } from './layout/grid-layout/grid-layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { MaterialModule } from './material.module';


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
    ReadDetailDialogComponent,
    ShowErrorComponent,
    ReadDetailDialogComponent,
    TopBarComponent,
    SideBarComponent
  ],
  providers: [
    MemberService,
    ProjectService,
    UseCaseService,
    IterationService,
    PhaseService,
    ActivityService,
    IterationsViewModel,
    IterationViewModel,
    RealizationsViewModel,
    PhasesViewModel,
    ActivityViewModel
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
    ReadDetailDialogComponent,
    ShowErrorComponent,
    TopBarComponent
  ]
})
export class SharedModule {
}
