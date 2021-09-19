import {Controller} from '../../commons/services/types/controller';
import {NotAssignedCost} from '../models/not-assigned-cost';
import {ActivityRepository} from '../repositories/activity.repository';

export class SplitActivityController implements Controller<NotAssignedCost, void>{
    constructor(private repository: ActivityRepository) {

    }

  async execute(notAssignedCost: NotAssignedCost): Promise<void> {
    const result = await this.repository.splitActivity(notAssignedCost.id);
    return result;
  }



}
