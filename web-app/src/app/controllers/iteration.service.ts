import {Injectable} from '@angular/core';
import {Iteration} from '../../logic/models/iteration';
import {IterationRestRepository} from '../infrastructure/iteration-rest-repository';
import {OpenIterationController} from '../../logic/controllers/open-iteration.controller';
import {UpdateIterationController} from '../../logic/controllers/update-iteration.controller';
import {OpenRealizationByIterationController} from '../../logic/controllers/open-realization-by-iteration.controller';
import {IterationViewModel} from './view-models/iteration-view-model';
import {RealizationsViewModel} from './view-models/realizations-view-model';
import {Id} from '../../commons/model/id';
import {ErrorViewModel} from '../../commons/services/view-models/error.view-model';
import {Observable} from 'rxjs';
import {Realization} from '../../logic/models/realization';

@Injectable()
export class IterationService {

  constructor(private repository: IterationRestRepository,
              private iterationViewModel: IterationViewModel,
              private errorViewModel: ErrorViewModel,
              private realizationsViewModel: RealizationsViewModel) {
  }


  public getIteration$(): Observable<Iteration> {
    return this.iterationViewModel.getStateValue();
  }

  public getRealizations$(): Observable<Realization[]> {
    return this.realizationsViewModel.getStateValue();
  }

  async openIteration(id: Id): Promise<void> {
    const result = await new OpenIterationController(this.repository).execute(id);
    if (result.isSuccess()) {
      this.iterationViewModel.setValue(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async updateIteration(iteration: Iteration): Promise<void> {
    const result = await new UpdateIterationController(this.repository).execute(iteration);
    if (!result.isSuccess()) {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async getRealizations(id: Id): Promise<void> {
    const result = await new OpenRealizationByIterationController(this.repository).execute(id);
    if (result.isSuccess()) {
      this.realizationsViewModel.setValue(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }
}
