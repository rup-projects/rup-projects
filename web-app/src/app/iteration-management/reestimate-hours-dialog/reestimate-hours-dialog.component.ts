import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivityProxyService} from '../../shared/services/activity-proxy.service';
import {Activity} from '../../shared/models/activity';
import {NotAssignedCost} from '../../shared/models/not-assigned-cost';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-reestimate-hours-dialog',
  templateUrl: './reestimate-hours-dialog.component.html',
  styleUrls: ['./reestimate-hours-dialog.component.scss']
})
export class ReestimateHoursDialogComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private activityService: ActivityProxyService, private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost },
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      duration: [1, [Validators.required, Validators.min(1), Validators.max(this.data.notAssignedCost.hours)]]
    });
  }

  reestimate(): void {
    this.activityService.reestimateActivity(
      this.data.activity.id,
      this.formGroup.getRawValue()).subscribe(() => this.matDialog.closeAll());
  }
}
