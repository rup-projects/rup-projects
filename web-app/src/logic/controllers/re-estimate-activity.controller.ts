import {ActivityRepository} from '../repositories/activity.repository';
import {ActivityHours} from '../models/activity-hours';
import {Controller} from '../../commons/services/types/controller';

export class ReEstimateActivityController implements Controller<ActivityHours, void>{
    constructor(private repository: ActivityRepository) {

    }

  async execute(activityHours: ActivityHours): Promise<void> {
    const result = await this.repository.reEstimateActivity(activityHours.activityId, activityHours.duration);
    return result;  }


}
