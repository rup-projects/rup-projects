import {Component, Inject, OnInit} from '@angular/core';
import {ActivityProxyService} from '../../../../controllers/activity-proxy.service';
import {IterationService} from '../../../../controllers/iteration.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Activity} from '../../../../../logic/models/activity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Realization} from '../../../../../logic/models/realization';

@Component({
  selector: 'app-activity-details-dialog',
  templateUrl: './activity-details-dialog.component.html',
  styleUrls: ['./activity-details-dialog.component.scss']
})
export class ActivityDetailsDialogComponent implements OnInit {

  constructor(private activityService: ActivityProxyService, private iterationProxyService: IterationService,
              private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { activityId: string, iterationId: string },
              private formBuilder: FormBuilder) {
  }

  activity$: Observable<Activity>;
  realizations$: Observable<Realization[]>;
  formGroup: FormGroup;
  selectedRealization: number;
  selectedHour: Date;

  ngOnInit(): void {
    this.activity$ = this.activityService.openActivity(this.data.activityId);
    this.realizations$ = this.iterationProxyService.getRealizations(Number(this.data.iterationId));
    this.formGroup = this.formBuilder.group({
      realizationId: [1, [Validators.required, Validators.min(1)]]
    });
  }

  getAvailableHours(iterationId: string): Date[] {
    // todo borrar de iteration y generar aqui segun iteration start -> end
    return [];
  }


  assignActivity(activity: Activity): void {
    const activityMember = {
      realizationId: this.selectedRealization,
      datetime: new Date(this.selectedHour)
    };
    this.activityService.assignActivity(
      activity,
      activityMember
      ).subscribe(() => this.matDialog.closeAll());
  }

  assignActivityToNotAssignedCost(activity: Activity): void {
    const activityMember = {
      realizationId: null,
      datetime: null
    };
    this.activityService.assignActivity(activity, activityMember).subscribe(() => this.matDialog.closeAll());
  }
}
