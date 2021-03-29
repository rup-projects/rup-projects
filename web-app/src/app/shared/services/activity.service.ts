import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resourceServer } from '../../../environments/environment';
import { Activity } from '../models/activity';
import { Member } from '../models/member';

@Injectable()
export class ActivityService {

  private RESOURCE = 'activities';

  constructor(private httpClient: HttpClient) {
  }

  splitActivity(activity: Activity): Promise<Member> {
    return this.httpClient.post<Member>(`${resourceServer}/${this.RESOURCE}`, activity)
      .toPromise()
  }

  assignActivity(activityId: number, memberId: number): Promise<Activity> {
    return this.httpClient.put<Member>(`${resourceServer}/${this.RESOURCE}/${activityId}`, {memberId: memberId})
      .toPromise()
  }

  reestimateActivity(activityId: number, duration: number): Promise<Activity> {
    return this.httpClient.put<Activity>(`${resourceServer}/${this.RESOURCE}/${activityId}`, {duration: duration})
      .toPromise()
  }

  closeActivity(activityId: number): Promise<Activity> {
    return this.httpClient.put<Activity>(`${resourceServer}/${this.RESOURCE}/${activityId}`, {})
      .toPromise()
  }

  mergeActivity(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }

}
