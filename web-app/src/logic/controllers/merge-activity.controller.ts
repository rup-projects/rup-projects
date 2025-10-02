import {ActivityRepository} from '../repositories/activity.repository';
import {Activity} from '../models/activity';

export class MergeActivityController {
    constructor(private repository: ActivityRepository) {

    }

  async execute(activity: Activity): Promise<void> {
    const result = await this.repository.mergeActivity(activity);
    return result;
  }


}
