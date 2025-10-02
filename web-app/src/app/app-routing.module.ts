import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridLayoutComponent } from './views/layout/grid-layout/grid-layout.component';

const routes: Routes = [
  {
    path: 'init-project',
    loadChildren: () => import('./views/features/init-project/init-project.module').then(m => m.InitProjectModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'init-project'},
  {
    path: '',
    component: GridLayoutComponent,
    children: [
      {
        path: 'project-management', loadChildren: () =>
          import('./views/features/project-management/project-management.module').then(m => m.ProjectManagementModule)
      },
      {
        path: 'member-management', loadChildren: () =>
          import('./views/features/member-management/member-management.module').then(m => m.MemberManagementModule)
      },
      {
        path: 'use-cases-management', loadChildren: () =>
          import('./views/features/usecases-management/use-cases-management.module').then(m => m.UseCasesManagementModule)
      },
      /*{
        path: 'iteration-management', loadChildren: () =>
          import('./views/features/iteration-management/iteration-management.module').then(m => m.IterationManagementModule)
      }*/
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
