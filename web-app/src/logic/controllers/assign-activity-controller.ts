import {ActivityRepository} from '../repositories/activity.repository';
import {ActivityMember} from '../models/activity-member';

export class AssignActivityController {
    constructor(private repository: ActivityRepository) {

    }

  async execute(activityMember: ActivityMember): Promise<void> {
    const result = await this.repository.assignActivity(activityMember);
    return result;
  }
}
