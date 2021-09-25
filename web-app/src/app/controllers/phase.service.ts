import {Injectable} from '@angular/core';
import {OpenPhasesController} from '../../logic/controllers/open-phases.controller';
import {OpenIterationsByPhaseController} from '../../logic/controllers/open-iterations-by-phase.controller';
import {PhaseRestRepository} from '../infrastructure/phase-rest-repository';
import {PhasesViewModel} from './view-models/phases-view-model';
import {IterationsViewModel} from './view-models/iterations-view-model';
import {Id} from '../../commons/model/id';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';
import {Phase} from '../../logic/models/phase';
import {Iteration} from '../../logic/models/iteration';

@Injectable()
export class PhaseService {

  constructor(private repository: PhaseRestRepository, private phasesViewModel: PhasesViewModel,
              private iterationsViewModel: IterationsViewModel) {
  }

  async openPhases(): Promise<void> {
    const command = new OpenPhasesController(this.repository);
    const result = await command.execute();
    this.phasesViewModel.setValue(result);

  }

  async openIterations(id: Id): Promise<void> {
    const command = new OpenIterationsByPhaseController(this.repository);
    const result = await command.execute(id);
    this.iterationsViewModel.setValue(result);
  }

  public getPhasesViewModel(): ReadableViewModel<Phase[]> {
    return this.phasesViewModel;
  }


  public getIterationsViewModel(): ReadableViewModel<Iteration[]> {
    return this.iterationsViewModel;
  }
}
