import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToMembersManagement(): void {
    this.router.navigateByUrl('/member-management');
  }

  // <a mat-tab-link  [routerLink]="['/project-management']">Project management</a>
// <a mat-tab-link routerLink="/member-management">Members management</a>
// <a mat-tab-link routerLink="/use-cases-management">Use cases management</a>
}
