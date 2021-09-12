import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UseCasesManagementComponent} from './use-cases-management.component';


const routes: Routes = [{ path: '', component: UseCasesManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseCasesManagementRoutingModule { }
