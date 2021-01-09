import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phase } from '../../models/phase';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  phases: Phase[];

  constructor(private phaseService: PhaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.phaseService.openPhases().subscribe(phases => this.phases = phases);
  }

  openIterations(phase: Phase) {
    this.router.navigateByUrl(`/iterations-management/${phase.id}`).then();
  }

}
