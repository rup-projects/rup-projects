import {Injectable} from '@angular/core';
import {resourceServer} from '../../../environments/environment';
import {Activity} from '../models/activity';
import {Observable} from 'rxjs';
import {NotAssignedCost} from '../models/not-assigned-cost';
import {HttpService} from '../../core/http.service';

@Injectable()
export class ActivityProxyService {

    private RESOURCE = 'activities';

    constructor(private httpService: HttpService) {
    }

    splitActivity(notAssignedCost: NotAssignedCost): Observable<void> {
        return this.httpService.post(`${resourceServer}/${this.RESOURCE}/splitActivity/${notAssignedCost.id}`);
    }

    closeActivity(activityId: number): Observable<Activity> {
        return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${activityId}`, {});
    }

}
