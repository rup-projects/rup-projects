import {Injectable} from '@angular/core';
import {resourceServer} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpService} from '../../../commons/services/http.service';
import {Realization} from '../../../logic/models/realization';

@Injectable()
export class RealizationProxyService {

  private RESOURCE = 'realization';

  constructor(private httpService: HttpService) {
  }

  getRealization(id: number): Observable<Realization> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
  }

}
