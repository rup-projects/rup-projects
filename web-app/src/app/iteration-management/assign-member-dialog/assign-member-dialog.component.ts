import {Component, Inject, OnInit} from '@angular/core';
import {ActivityProxyService} from '../../shared/services/activity-proxy.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Activity} from '../../shared/models/activity';
import {NotAssignedCost} from '../../shared/models/not-assigned-cost';
import {Observable} from 'rxjs';
import {Iteration} from '../../shared/models/iteration';
import {Realization} from '../../shared/models/realization';
import {IterationProxyService} from '../../shared/services/iteration-proxy.service';

@Component({
  selector: 'app-assign-member-dialog',
  templateUrl: './assign-member-dialog.component.html',
  styleUrls: ['./assign-member-dialog.component.scss']
})
export class AssignMemberDialogComponent implements OnInit {

  constructor(private activityService: ActivityProxyService, private iterationProxyService: IterationProxyService, private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost, iteration: Iteration }) {
  }

  realizations$: Observable<Realization[]>;
  selectedRealization: number;
  selectedHour: string;


  ngOnInit(): void {
    this.realizations$ = this.iterationProxyService.getRealizations(this.data.iteration);
  }

  assignActivity(): void {
    this.activityService.assignActivity(this.data.activity,
      {
        realizationId: this.selectedRealization,
        datetime: this.selectedHour

      }).subscribe(() => this.matDialog.closeAll());
  }


}
