import { Injectable } from '@angular/core';
import { Phase } from '../../../logic/models/phase';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, first, map } from 'rxjs/operators';

interface PhasesVmState {
  phases: Phase[];
}

const DEFAULT_STATE: PhasesVmState = {
  phases: [],
};

@Injectable()
export class PhasesViewModel {

  private store: BehaviorSubject<PhasesVmState>;
  private state$: Observable<PhasesVmState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public get phases$(): Observable<Phase[]> {
    return this.state$.pipe(map(state => state.phases), distinctUntilChanged());
  }

  public async dispatchPhases(phases: Phase[]): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, phases });
  }

  private getCurrentState(): Promise<PhasesVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: PhasesVmState): void {
    this.store.next(state);
  }


}
