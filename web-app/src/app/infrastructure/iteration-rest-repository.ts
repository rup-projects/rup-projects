import {Injectable} from '@angular/core';
import {HttpService} from '../../commons/services/http.service';
import {resourceServer} from '../../environments/environment';
import {Iteration} from '../../logic/models/iteration';
import {Realization} from '../../logic/models/realization';
import {IterationRepository} from '../../logic/repositories/iteration.repository';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class IterationRestRepository implements IterationRepository {

  private RESOURCE = 'iterations';

  constructor(private httpService: HttpService) {
  }

  getOne(id: Id): Promise<Iteration> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }

  update(id: Id, dto: Iteration): Promise<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto).toPromise();
  }

  getRealizations(iterationId: Id): Promise<Realization[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${iterationId}/realizations`).toPromise();
  }


}
