import { Project } from '../../../logic/models/project';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, first, map } from 'rxjs/operators';

interface InitProjectVmState {
  prePlannedProject: Project;
  existingPlannedProject: Project;
  completedOperationPrePlanProject: boolean;
  completedOperationPlanProject: boolean;
}

const DEFAULT_STATE: InitProjectVmState = {
  prePlannedProject: null,
  existingPlannedProject: null,
  completedOperationPrePlanProject: false,
  completedOperationPlanProject: false,
};

@Injectable()
export class InitProjectViewModel {

  private store: BehaviorSubject<InitProjectVmState>;
  private state$: Observable<InitProjectVmState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public get existingPlannedProject$(): Observable<Project> {
    return this.state$.pipe(map(state => state.existingPlannedProject), distinctUntilChanged());
  }

  public get prePlannedProject$(): Observable<Project> {
    return this.state$.pipe(map(state => state.prePlannedProject), distinctUntilChanged());
  }

  public get completedOperationPrePlanProject$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.completedOperationPrePlanProject), distinctUntilChanged());
  }

  public get completedOperationPlanProject$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.completedOperationPlanProject), distinctUntilChanged());
  }

  public resetStore(): void {
    this.store.next(DEFAULT_STATE);
  }

  public async dispatchExitingPlannedProject(existingPlannedProject: Project): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, existingPlannedProject });
  }

  public async dispatchSuccefullResultPrePlanProject(prePlannedProject: Project): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, prePlannedProject, completedOperationPrePlanProject: true });
  }

  public async dispatchSuccefullResultPlanProjectOperation(): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, completedOperationPlanProject: true });
  }

  private getCurrentState(): Promise<InitProjectVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: InitProjectVmState): void {
    this.store.next(state);
  }

}
