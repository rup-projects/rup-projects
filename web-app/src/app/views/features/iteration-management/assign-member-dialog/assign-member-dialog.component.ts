import {Component, Inject, OnInit} from '@angular/core';
import {ActivityProxyService} from '../../../../controllers/activity-proxy.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Activity} from '../../../../../logic/models/activity';
import {NotAssignedCost} from '../../../../../logic/models/not-assigned-cost';
import {Observable} from 'rxjs';
import {Iteration} from '../../../../../logic/models/iteration';
import {Realization} from '../../../../../logic/models/realization';
import {IterationService} from '../../../../controllers/iteration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-assign-member-dialog',
  templateUrl: './assign-member-dialog.component.html',
  styleUrls: ['./assign-member-dialog.component.scss']
})
export class AssignMemberDialogComponent implements OnInit {

  constructor(private activityService: ActivityProxyService, private iterationProxyService: IterationService, private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { activity: Activity, notAssignedCost: NotAssignedCost, iteration: Iteration }, private formBuilder: FormBuilder) {
  }

  realizations$: Observable<Realization[]>;
  selectedRealization: number;
  selectedHour: Date;
  formGroup: FormGroup;

  ngOnInit(): void {
    this.realizations$ = this.iterationProxyService.getRealizations(this.data.iteration.id);
    this.formGroup = this.formBuilder.group({
      realizationId: [1, [Validators.required, Validators.min(1), Validators.max(this.data.notAssignedCost.hours)]]
    });
  }

  assignActivity(): void {
    this.activityService.assignActivity(this.data.activity,
      {
        realizationId: this.selectedRealization,
        datetime: new Date(this.selectedHour)
      }).subscribe(() => this.matDialog.closeAll());
  }


  getAvailableHours(iteration: Iteration): Date[] {
    // todo borrar de iteration y generar aqui segun iteration start -> end
    return iteration.dateTimes;
  }
}
