import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Project } from '../../../logic/models/project';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {ControllerResponse, ControllerResponseStatus} from "../../../logic/controllers/types/controller-response";
import {AppError} from "../../../logic/controllers/types/app-error";
import {ViewModel} from "../../../commons/services/types/view-model";
import {ReadableViewModel} from "../../../commons/services/types/readable-view-model";

const DEFAULT_STATE: ControllerResponse<Project> = {
  status: null,
  data: null,
  error: null,
}

@Injectable()
export class ProjectViewModel implements ViewModel<ControllerResponse<Project>>, ReadableViewModel<ControllerResponse<Project>> {

  private valueStore: BehaviorSubject<ControllerResponse<Project>>;
  private state$: Observable<ControllerResponse<Project>>;
  private value: ControllerResponse<Project>;

  dataState$: Observable<Project>;
  error$: Observable<AppError>;
  status$: Observable<ControllerResponseStatus>;

  vm$: Observable<ControllerResponse<Project>>;


  constructor() {
    this.valueStore = new BehaviorSubject<ControllerResponse<Project>>(DEFAULT_STATE);
    this.state$ = this.valueStore.asObservable();

    this.dataState$ = this.state$.pipe(map(state => state.data), distinctUntilChanged());
    this.error$ = this.state$.pipe(map(state => state.error), distinctUntilChanged());
    this.status$ = this.state$.pipe(map(state => state.status), distinctUntilChanged());

    this.vm$ = combineLatest([
      this.error$,
      this.dataState$,
      this.status$,
    ]).pipe(
      map(
        ([
          error,
          data,
          status,
        ]) => {
          return {
            error, data, status
          };
        }),
      debounceTime(0)
    )
  }

  public getStateValue(): Observable<ControllerResponse<Project>> {
    return this.state$;
  }

  /*public setValue(value: ControllerResponse<Project>): void {
    const newState = { ...this.value, value };
    this.valueStore.next(newState);
  }*/

  setError(error: AppError) {
    this.updateState({ ...this.value, error });
  }

  setValue(state: ControllerResponse<Project>) {
    this.updateState(state);
  }

  private updateState(state: ControllerResponse<Project>) {
    this.valueStore.next(state);
  }

  public emptyValueStore(): void {
    this.valueStore.next(DEFAULT_STATE);
  }



}




