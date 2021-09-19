import {GetOneDao} from '../../commons/services/base.dao';
import {Activity} from '../models/activity';
import {ActivityMember} from '../models/activity-member';

export interface ActivityRepository extends GetOneDao<number, Activity> {

  splitActivity(notAssignedCostId: number): Promise<void>;

  mergeActivity(activity: Activity): Promise<void>;

  reEstimateActivity(id: number, duration: number): Promise<void>;

  assignActivity(activityMember: ActivityMember): Promise<void>;
}

