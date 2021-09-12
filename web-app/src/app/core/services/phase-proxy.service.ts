import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServer } from '../../../environments/environment';
import { Phase } from '../../../logic/models/phase';
import {Iteration} from '../../../logic/models/iteration';
import {HttpService} from '../../../commons/services/http.service';

@Injectable()
export class PhaseProxyService {

  private RESOURCE = 'phases';

  constructor(private httpService: HttpService) {
  }

  openPhases(): Observable<Phase[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
  }

  openIterations(phaseId: string): Observable<Iteration[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${phaseId}/iterations`);
  }


}
