import { Injectable } from '@angular/core';
import {Iteration} from '../../../logic/models/iteration';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, first, map } from 'rxjs/operators';

interface IterationsVmState {
  iterations: Iteration[];
}

const DEFAULT_STATE: IterationsVmState = {
  iterations: [],
};

@Injectable()
export class IterationsViewModel {

  private store: BehaviorSubject<IterationsVmState>;
  private state$: Observable<IterationsVmState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public get iterations$(): Observable<Iteration[]> {
    return this.state$.pipe(map(state => state.iterations), distinctUntilChanged());
  }

  public async dispatchIterations(iterations: Iteration[]): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, iterations });
  }

  private getCurrentState(): Promise<IterationsVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: IterationsVmState): void {
    this.store.next(state);
  }

}


