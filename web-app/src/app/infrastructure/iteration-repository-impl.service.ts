import {Injectable} from '@angular/core';
import {HttpService} from '../../commons/services/http.service';
import {resourceServer} from '../../environments/environment';
import {Iteration} from '../../logic/models/iteration';
import {Realization} from '../../logic/models/realization';
import {IterationRepository} from '../../logic/repositories/iteration.repository';

@Injectable({
  providedIn: 'root'
})
export class IterationRepositoryImplService implements IterationRepository {

  private RESOURCE = 'iterations';

  constructor(private httpService: HttpService) {
  }

  getOne(id: number): Promise<Iteration> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }

  update(id: number, dto: Iteration): Promise<void> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto).toPromise();
  }

  getRealizations(iterationId: number): Promise<Realization[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${iterationId}/realizations`).toPromise();
  }


}
