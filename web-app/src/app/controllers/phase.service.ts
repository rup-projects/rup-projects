import {Injectable} from '@angular/core';
import {OpenPhasesController} from '../../logic/controllers/open-phases.controller';
import {OpenIterationsByPhaseController} from '../../logic/controllers/open-iterations-by-phase.controller';
import {PhaseRepositoryImplService} from '../infrastructure/phase-repository-impl.service';
import {PhasesViewModel} from './view-models/phases-view-model';
import {IterationsViewModel} from './view-models/iterations-view-model';
import {Id} from '../../commons/model/id';

@Injectable()
export class PhaseService {

  constructor(private repository: PhaseRepositoryImplService, private phasesViewModel: PhasesViewModel,
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


}
