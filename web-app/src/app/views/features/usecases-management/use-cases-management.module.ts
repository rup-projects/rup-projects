import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UseCasesManagementRoutingModule} from './use-cases-management-routing.module';
import {UseCasesManagementComponent} from './use-cases-management.component';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {SharedModule} from '../../shared.module';
import {UseCaseService} from '../../../controllers/use-case.service';
import {UseCaseRepositoryImplService} from '../../../infrastructure/use-case-repository-impl.service';
import {UseCaseViewModel} from '../../../controllers/view-models/use-case.view-model';
import {UseCasesViewModel} from '../../../controllers/view-models/use-cases.view-model';


@NgModule({
  declarations: [UseCasesManagementComponent, UseCaseDialogComponent],
  imports: [
    CommonModule,
    UseCasesManagementRoutingModule,
    SharedModule
  ],
  providers: [UseCaseService, UseCaseRepositoryImplService, UseCaseViewModel, UseCasesViewModel]
})
export class UseCasesManagementModule {
}
