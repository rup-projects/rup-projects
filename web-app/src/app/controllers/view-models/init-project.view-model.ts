import { Project } from '../../../logic/models/project';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, first, map} from "rxjs/operators";

interface InitProjectVmState {
  project: Project,
}

const DEFAULT_STATE: InitProjectVmState = {
  project: null,
}

@Injectable()
export class InitProjectViewModel {

  private store: BehaviorSubject<InitProjectVmState>;
  private state$: Observable<InitProjectVmState>;
  // private _project$: Observable<Project>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
    // this._project$ = this.state$.pipe(map(state => state.project), distinctUntilChanged());
  }

  public get project$(): Observable<Project> {
    return this.state$.pipe(map(state => state.project), distinctUntilChanged());
  }

  public resetStore(): void {
    this.store.next(DEFAULT_STATE);
  }

  public async dispatchProject(project: Project) {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, project });
  }

  private getCurrentState(): Promise<InitProjectVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: InitProjectVmState) {
    this.store.next(state);
  }

}
