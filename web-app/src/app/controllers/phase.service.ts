import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Phase} from '../../logic/models/phase';
import {Iteration} from '../../logic/models/iteration';
import {OpenPhasesController} from '../../logic/controllers/open-phases.controller';
import {OpenIterationsByPhaseController} from '../../logic/controllers/open-iterations-by-phase.controller';
import {PhaseRepositoryImplService} from '../infrastructure/phase-repository-impl.service';

@Injectable()
export class PhaseService {

  constructor(private repository: PhaseRepositoryImplService) {
  }

  openPhases(): Observable<Phase[]> {
    const command = new OpenPhasesController(this.repository);
    return from(command.execute());

  }

  openIterations(phaseId: number): Observable<Iteration[]> {
    const command = new OpenIterationsByPhaseController(this.repository);
    return from(command.execute(phaseId));
  }


}
