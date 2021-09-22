import {Injectable} from '@angular/core';
import {Activity} from '../../logic/models/activity';
import {from, Observable} from 'rxjs';
import {NotAssignedCost} from '../../logic/models/not-assigned-cost';
import {ActivityHours} from '../../logic/models/activity-hours';
import {ActivityMember} from '../../logic/models/activity-member';
import {ActivityRepositoryImplService} from '../infrastructure/activity-repository-impl.service';
import {SplitActivityController} from '../../logic/controllers/split-activity.controller';
import {MergeActivityController} from '../../logic/controllers/merge-activity.controller';
import {ReEstimateActivityController} from '../../logic/controllers/re-estimate-activity.controller';
import {OpenActivityController} from '../../logic/controllers/openActivityController';
import {AssignActivityController} from '../../logic/controllers/assign-activity-controller';
import {ActivityViewModel} from './view-models/activity-view-model';

@Injectable()
export class ActivityService {

  constructor(private repository: ActivityRepositoryImplService, private activityViewModel: ActivityViewModel) {
  }

  openActivity(activityId: number): Observable<Activity> {
    const command = new OpenActivityController(this.repository);
    return from(command.execute(activityId));
  }

  splitActivity(notAssignedCost: NotAssignedCost): Observable<void> {
    const command = new SplitActivityController(this.repository);
    return from(command.execute(notAssignedCost));
  }

  mergeActivity(activity: Activity): Observable<void> {
    const command = new MergeActivityController(this.repository);
    return from(command.execute(activity));
  }


  reEstimateActivity(id: number, activityHours: ActivityHours): Observable<void> {
    const command = new ReEstimateActivityController(this.repository);
    activityHours.activityId = id;
    return from(command.execute(activityHours));
  }

  assignActivity(activityMember: ActivityMember): Observable<void> {
    const command = new AssignActivityController(this.repository);
    return from(command.execute(activityMember));
  }

}
