import {Injectable} from '@angular/core';
import {HttpService} from '../../commons/services/http.service';
import {resourceServer} from '../../environments/environment';
import {ActivityRepository} from '../../logic/repositories/activity.repository';
import {Activity} from '../../logic/models/activity';
import {ActivityMember} from '../../logic/models/activity-member';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class ActivityRestRepository implements ActivityRepository {

  private RESOURCE = 'activities';

  constructor(private httpService: HttpService) {
  }

  getOne(id: Id): Promise<Activity> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }

  splitActivity(notAssignedCostId: Id): Promise<void> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}/splitActivity/${notAssignedCostId}`).toPromise();
  }

  mergeActivity(activity: Activity): Promise<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${activity.id}`).toPromise();
  }

  reEstimateActivity(id: Id, duration: number): Promise<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}/reestimate`, {duration}).toPromise();
  }

  assignActivity(activityMember: ActivityMember): Promise<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${activityMember.activityId}/assign`,
      {realizationId: activityMember.realizationId, datetime: activityMember.datetime}).toPromise();
  }

}
