import {Injectable} from '@angular/core';
import {resourceServer} from '../../../environments/environment';
import {Activity} from '../models/activity';
import {Observable} from 'rxjs';
import {NotAssignedCost} from '../models/not-assigned-cost';
import {HttpService} from '../../core/http.service';
import {ActivityHours} from '../models/activity-hours';
import {ActivityMember} from '../models/activity-member';

@Injectable()
export class ActivityProxyService {

  private RESOURCE = 'activities';

  constructor(private httpService: HttpService) {
  }

  splitActivity(notAssignedCost: NotAssignedCost): Observable<void> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}/splitActivity/${notAssignedCost.id}`);
  }

  mergeActivity(activity: Activity): Observable<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${activity.id}`);
  }

  reestimateActivity(id: number, activityHours: ActivityHours): Observable<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}/reestimate`, activityHours);
  }

  closeActivity(activityId: number): Observable<Activity> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${activityId}`, {});
  }

  assignActivity(activity: Activity, activityMember: ActivityMember): Observable<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${activity.id}/assign`, activityMember);
  }

  openActivity(activityId: string): Observable<Activity> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${activityId}`);
  }

}
