import { Injectable } from '@angular/core';
import { OpenPhasesController } from '../../logic/controllers/open-phases.controller';
import { OpenIterationsByPhaseController } from '../../logic/controllers/open-iterations-by-phase.controller';
import { PhaseRestRepository } from '../infrastructure/phase-rest-repository';
import { PhasesViewModel } from './view-models/phases-view-model';
import { IterationsViewModel } from './view-models/iterations-view-model';
import { Id } from '../../commons/model/id';
import { Phase } from '../../logic/models/phase';
import { ErrorViewModel } from '../../commons/services/view-models/error.view-model';
import { Observable } from 'rxjs';
import { ControllerResponseStatus } from '../../logic/controllers/core/types/controller-response';
import { Iteration } from '../../logic/models/iteration';

@Injectable()
export class PhaseService {

  constructor(private repository: PhaseRestRepository,
              private phasesViewModel: PhasesViewModel,
              private iterationsViewModel: IterationsViewModel,
              private errorViewModel: ErrorViewModel,
  ) {}

  public getPhases$(): Observable<Phase[]> {
    return this.phasesViewModel.phases$;
  }

  public getIterations$(): Observable<Iteration[]> {
    return this.iterationsViewModel.iterations$;
  }

  async openPhases(): Promise<void> {
    const result = await new OpenPhasesController(this.repository).execute();
    if (result.isSuccess()) {
      const phases = result.data;
      await this.phasesViewModel.dispatchPhases(phases);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async openIterations(id: Id): Promise<void> {
    const result = await new OpenIterationsByPhaseController(this.repository).execute(id);
    if (result.status === ControllerResponseStatus.OK) {
      const iterations = result.data;
      await this.iterationsViewModel.dispatchIterations(iterations);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

}
