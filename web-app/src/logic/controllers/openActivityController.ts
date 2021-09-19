import {ActivityRepository} from '../repositories/activity.repository';
import {Controller} from '../../commons/services/types/controller';
import {Activity} from '../models/activity';

export class OpenActivityController implements Controller<number, Activity>{
    constructor(private repository: ActivityRepository) {

    }

  async execute(activityId: number): Promise<Activity> {
    return await this.repository.getOne(activityId);
  }

}
