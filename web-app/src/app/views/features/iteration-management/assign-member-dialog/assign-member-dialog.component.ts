import {Component, Inject, OnInit} from '@angular/core';
import {ActivityService} from '../../../../controllers/activity.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Activity} from '../../../../../logic/models/activity';
import {NotAssignedCost} from '../../../../../logic/models/not-assigned-cost';
import {Observable} from 'rxjs';
import {Iteration} from '../../../../../logic/models/iteration';
import {Realization} from '../../../../../logic/models/realization';
import {IterationService} from '../../../../controllers/iteration.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {RealizationsViewModel} from '../../../../controllers/view-models/realizations-view-model';

@Component({
  selector: 'app-assign-member-dialog',
  templateUrl: './assign-member-dialog.component.html',
  styleUrls: ['./assign-member-dialog.component.scss']
})
export class AssignMemberDialogComponent implements OnInit {

  constructor(private activityService: ActivityService, private iterationProxyService: IterationService, private matDialog: MatDialog,
              private realizationsViewModel: RealizationsViewModel,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost, iteration: Iteration }, private formBuilder: UntypedFormBuilder) {
  }

  realizations$: Observable<Realization[]>;
  selectedRealization: number;
  selectedHour: Date;
  formGroup: UntypedFormGroup;

  ngOnInit(): void {
    this.realizations$ = this.realizationsViewModel.getStateValue();
    this.iterationProxyService.getRealizations(this.data.iteration.id);
    this.formGroup = this.formBuilder.group({
      realizationId: [1, [Validators.required, Validators.min(1), Validators.max(this.data.notAssignedCost.hours)]]
    });
  }

  assignActivity(): void {
    this.activityService.assignActivity(
      {
        activityId: this.data.activity.id,
        realizationId: this.selectedRealization,
        datetime: new Date(this.selectedHour)
      }).then(() => this.matDialog.closeAll());
  }


  getAvailableHours(iteration: Iteration): Date[] {
    // todo borrar de iteration y generar aqui segun iteration start -> end
    return iteration.dateTimes;
  }
}
