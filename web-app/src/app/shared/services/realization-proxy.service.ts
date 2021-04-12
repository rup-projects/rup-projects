import {Injectable} from '@angular/core';
import {resourceServer} from '../../../environments/environment';
import {Activity} from '../models/activity';
import {Observable} from 'rxjs';
import {NotAssignedCost} from '../models/not-assigned-cost';
import {HttpService} from '../../core/http.service';
import {ActivityHours} from '../models/activity-hours';
import {ActivityMember} from '../models/activity-member';
import {UseCase} from '../models/use-case';
import {Realization} from '../models/realization';

@Injectable()
export class RealizationProxyService {

  private RESOURCE = 'realization';

  constructor(private httpService: HttpService) {
  }

  getRealization(id: number): Observable<Realization> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
  }

}
