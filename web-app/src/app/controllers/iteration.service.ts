import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Iteration} from '../../logic/models/iteration';
import {Realization} from '../../logic/models/realization';
import {IterationRepositoryImplService} from '../infrastructure/iteration-repository-impl.service';
import {OpenIterationController} from '../../logic/controllers/open-iteration.controller';
import {UpdateIterationController} from '../../logic/controllers/update-iteration.controller';
import {OpenRealizationByIterationController} from '../../logic/controllers/open-realization-by-iteration.controller';

@Injectable()
export class IterationService {

  constructor(private repository: IterationRepositoryImplService) {
  }

  openIteration(iterationId: number): Observable<Iteration> {
    const command = new OpenIterationController(this.repository);
    return from(command.execute(iterationId));
  }

  updateIteration(iteration: Iteration): Observable<void> {
    const command = new UpdateIterationController(this.repository);
    return from(command.execute(iteration));

  }

  getRealizations(iterationId: number): Observable<Realization[]> {
    const command = new OpenRealizationByIterationController(this.repository);
    return from(command.execute(iterationId));
  }
}
