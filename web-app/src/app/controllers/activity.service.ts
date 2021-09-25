import {Injectable} from '@angular/core';
import {Activity} from '../../logic/models/activity';
import {NotAssignedCost} from '../../logic/models/not-assigned-cost';
import {ActivityHours} from '../../logic/models/activity-hours';
import {ActivityMember} from '../../logic/models/activity-member';
import {ActivityRestRepository} from '../infrastructure/activity-rest-repository';
import {SplitActivityController} from '../../logic/controllers/split-activity.controller';
import {MergeActivityController} from '../../logic/controllers/merge-activity.controller';
import {ReEstimateActivityController} from '../../logic/controllers/re-estimate-activity.controller';
import {OpenActivityController} from '../../logic/controllers/openActivityController';
import {AssignActivityController} from '../../logic/controllers/assign-activity-controller';
import {ActivityViewModel} from './view-models/activity-view-model';
import {Id} from '../../commons/model/id';

@Injectable()
export class ActivityService {

  constructor(private repository: ActivityRestRepository, private activityViewModel: ActivityViewModel) {
  }

  async openActivity(id: Id): Promise<void> {
    const command = new OpenActivityController(this.repository);
    const result = await command.execute(id);
    this.activityViewModel.setValue(result);
  }

  async splitActivity(notAssignedCost: NotAssignedCost): Promise<void> {
    const command = new SplitActivityController(this.repository);
    await command.execute(notAssignedCost);
  }

  async mergeActivity(activity: Activity): Promise<void> {
    const command = new MergeActivityController(this.repository);
    await command.execute(activity);
  }

  async reEstimateActivity(id: Id, activityHours: ActivityHours): Promise<void> {
    const command = new ReEstimateActivityController(this.repository);
    activityHours.activityId = id;
    await command.execute(activityHours);
  }

  async assignActivity(activityMember: ActivityMember): Promise<void> {
    const command = new AssignActivityController(this.repository);
    await command.execute(activityMember);
  }

}
