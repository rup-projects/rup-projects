import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Iteration} from '../../logic/models/iteration';
import {IterationRepositoryImplService} from '../infrastructure/iteration-repository-impl.service';
import {OpenIterationController} from '../../logic/controllers/open-iteration.controller';
import {UpdateIterationController} from '../../logic/controllers/update-iteration.controller';
import {OpenRealizationByIterationController} from '../../logic/controllers/open-realization-by-iteration.controller';
import {IterationViewModel} from './view-models/iteration-view-model';
import {RealizationsViewModel} from './view-models/realizations-view-model';

@Injectable()
export class IterationService {

  constructor(private repository: IterationRepositoryImplService,
              private iterationViewModel: IterationViewModel,
              private realizationsViewModel: RealizationsViewModel) {
  }

  async openIteration(iterationId: number): Promise<void> {
    const command = new OpenIterationController(this.repository);
    const result = await command.execute(iterationId);
    this.iterationViewModel.setValue(result);
  }

  updateIteration(iteration: Iteration): Observable<void> {
    const command = new UpdateIterationController(this.repository);
    return from(command.execute(iteration));

  }

  async getRealizations(iterationId: number): Promise<void> {
    const command = new OpenRealizationByIterationController(this.repository);
    const result = await command.execute(iterationId);
    this.realizationsViewModel.setValue(result);
  }
}
