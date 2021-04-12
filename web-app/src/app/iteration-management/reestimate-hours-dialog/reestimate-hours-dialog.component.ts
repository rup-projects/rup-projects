import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivityProxyService} from '../../shared/services/activity-proxy.service';
import {Activity} from '../../shared/models/activity';
import {NotAssignedCost} from '../../shared/models/not-assigned-cost';


@Component({
  selector: 'app-reestimate-hours-dialog',
  templateUrl: './reestimate-hours-dialog.component.html',
  styleUrls: ['./reestimate-hours-dialog.component.scss']
})
export class ReestimateHoursDialogComponent implements OnInit {

  constructor(private activityService: ActivityProxyService, private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost }) {
  }

  ngOnInit(): void {
  }


  reestimate(): void {
    this.activityService.reestimateActivity(this.data.activity.id,
      {
        duration: this.data.activity.hours
      }).subscribe(() => this.matDialog.closeAll());
  }
}
