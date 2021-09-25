import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import {PhaseRepository} from '../../logic/repositories/phase.repository';
import {Phase} from '../../logic/models/phase';
import {Iteration} from '../../logic/models/iteration';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class PhaseRestRepository implements PhaseRepository {

  private RESOURCE = 'phases';

  constructor(private httpService: HttpService) {
  }

  getAll(): Promise<Phase[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  getIterations(phaseId: Id): Promise<Iteration[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/${phaseId}/iterations`);
    return httpResult.toPromise();
  }

}
