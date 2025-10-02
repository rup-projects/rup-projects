import {ActivityRepository} from '../repositories/activity.repository';
import {Controller} from '../../commons/services/types/controller';
import {Activity} from '../models/activity';
import {Id} from '../../commons/model/id';

export class OpenActivityController implements Controller<number, Activity>{
    constructor(private repository: ActivityRepository) {

    }

  async execute(id: Id): Promise<Activity> {
    return await this.repository.getOne(id);
  }

}
