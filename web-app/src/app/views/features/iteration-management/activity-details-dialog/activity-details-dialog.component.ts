import {Component, Inject, OnInit} from '@angular/core';
import {ActivityService} from '../../../../controllers/activity.service';
import {IterationService} from '../../../../controllers/iteration.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Activity} from '../../../../../logic/models/activity';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Realization} from '../../../../../logic/models/realization';
import {RealizationsViewModel} from '../../../../controllers/view-models/realizations-view-model';
import {ActivityViewModel} from '../../../../controllers/view-models/activity-view-model';

@Component({
  selector: 'app-activity-details-dialog',
  templateUrl: './activity-details-dialog.component.html',
  styleUrls: ['./activity-details-dialog.component.scss']
})
export class ActivityDetailsDialogComponent implements OnInit {

  constructor(private activityService: ActivityService, private iterationService: IterationService,
              @Inject(MAT_DIALOG_DATA) public data: { activityId: string, iterationId: string },
              private formBuilder: UntypedFormBuilder, private matDialog: MatDialog,
              private realizationsViewModel: RealizationsViewModel, private activityViewModel: ActivityViewModel) {
  }

  activity$: Observable<Activity>;
  realizations$: Observable<Realization[]>;
  formGroup: UntypedFormGroup;
  selectedRealization: number;
  selectedHour: Date;

  ngOnInit(): void {
    this.activity$ = this.activityViewModel.getStateValue();
    this.activityService.openActivity(Number(this.data.activityId));
    this.realizations$ = this.iterationService.getRealizations$();
    this.iterationService.getRealizations(Number(this.data.iterationId));
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
      datetime: new Date(this.selectedHour),
      activityId: activity.id
    };
    this.activityService.assignActivity(activityMember).then(() => this.matDialog.closeAll());
  }

  assignActivityToNotAssignedCost(activity: Activity): void {
    const activityMember = {
      activityId: activity.id,
      realizationId: null,
      datetime: null
    };
    this.activityService.assignActivity(activityMember).then(() => this.matDialog.closeAll());
  }
}
