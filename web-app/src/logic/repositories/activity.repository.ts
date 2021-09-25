import {GetOneDao} from '../../commons/services/base.dao';
import {Activity} from '../models/activity';
import {ActivityMember} from '../models/activity-member';
import {Id} from '../../commons/model/id';

export interface ActivityRepository extends GetOneDao<Id, Activity> {

  splitActivity(notAssignedCostId: Id): Promise<void>;

  mergeActivity(activity: Activity): Promise<void>;

  reEstimateActivity(id: Id, duration: Id): Promise<void>;

  assignActivity(activityMember: ActivityMember): Promise<void>;
}

