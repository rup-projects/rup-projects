import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {resourceServer} from '../../../environments/environment';
import {Iteration} from '../models/iteration';
import {HttpService} from '../../core/http.service';
import {NotAssignedCost} from '../models/not-assigned-cost';
import {Activity} from '../models/activity';

@Injectable()
export class IterationProxyService {

    private RESOURCE = 'iterations';

    constructor(private httpService: HttpService) {
    }

    openIterations(): Observable<Iteration[]> {
        return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    }

    openIterationsByPhase(phaseId: string): Observable<Iteration[]> {
        return this.httpService.get(`${resourceServer}/${this.RESOURCE}/phase/${phaseId}`);
    }

    openIteration(iterationId: string): Observable<Iteration> {
        return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${iterationId}`);
    }

    updateIteration(iteration: Iteration): Observable<Iteration> {
        return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${iteration.id}`, iteration);
    }


    splitNotAssignedCost(iterationId: number, notAssignedCost: NotAssignedCost): Observable<void> {
        return this.httpService.post(`${resourceServer}/${this.RESOURCE}/${iterationId}/splitNotAssignedCost/${notAssignedCost.id}`);
    }

    mergeActivity(iterationId: number, notAssignedCost: NotAssignedCost, notAssignedActivity: Activity): Observable<void> {
        return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${iterationId}/notAssignedCost/${notAssignedCost.id}/mergeActivity/${notAssignedActivity.id}`);
    }
}
