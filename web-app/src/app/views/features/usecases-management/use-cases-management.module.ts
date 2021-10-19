import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UseCasesManagementRoutingModule} from './use-cases-management-routing.module';
import {UseCasesManagementComponent} from './use-cases-management.component';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {SharedModule} from '../../shared.module';
import {UseCaseService} from '../../../controllers/use-case.service';
import {UseCaseRestRepository} from '../../../infrastructure/use-case-rest-repository';
import {UseCasesManagementViewModel} from '../../../controllers/view-models/use-cases-management-view-model.service';


@NgModule({
  declarations: [UseCasesManagementComponent, UseCaseDialogComponent],
  imports: [
    CommonModule,
    UseCasesManagementRoutingModule,
    SharedModule
  ],
  providers: [UseCaseService, UseCaseRestRepository, UseCasesManagementViewModel]
})
export class UseCasesManagementModule {
}
