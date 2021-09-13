import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UseCasesManagementRoutingModule} from './use-cases-management-routing.module';
import {UseCasesManagementComponent} from './use-cases-management.component';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {SharedModule} from '../../shared.module';


@NgModule({
  declarations: [UseCasesManagementComponent, UseCaseDialogComponent],
  imports: [
    CommonModule,
    UseCasesManagementRoutingModule,
    SharedModule

  ]
})
export class UseCasesManagementModule {
}
