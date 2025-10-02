import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivityService} from '../../../../controllers/activity.service';
import {Activity} from '../../../../../logic/models/activity';
import {NotAssignedCost} from '../../../../../logic/models/not-assigned-cost';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-reestimate-hours-dialog',
  templateUrl: './reestimate-hours-dialog.component.html',
  styleUrls: ['./reestimate-hours-dialog.component.scss']
})
export class ReestimateHoursDialogComponent implements OnInit {

  formGroup: UntypedFormGroup;

  constructor(private activityService: ActivityService, private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost },
              private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      duration: [1, [Validators.required, Validators.min(1), Validators.max(this.data.notAssignedCost.hours)]]
    });
  }

  reEstimate(): void {
    this.activityService.reEstimateActivity(this.data.activity.id, this.formGroup.getRawValue())
      .then(() => this.matDialog.closeAll());
  }
}
