import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, first, map, tap} from "rxjs/operators";
import {AppError} from "../../../logic/controllers/types/app-error";

interface ErrorsState {
  errors: AppError[],
}

const DEFAULT_STATE: ErrorsState = {
  errors: [],
}

@Injectable({
  providedIn: 'root',
})
export class ErrorViewModel {

  private store: BehaviorSubject<ErrorsState>;
  private state$: Observable<ErrorsState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public get errors$(): Observable<AppError[]> {
    return this.state$.pipe(map(state => state.errors),
      filter(errors => errors.length > 0), debounceTime(500), distinctUntilChanged()
    );
  }

  public resetStore(): void {
    this.store.next(DEFAULT_STATE);
  }

  public async dispatchAppError(appError: AppError) {
    const currentState = await this.getCurrentState();
    const newState = { ...currentState };
    newState.errors.push(appError);
    this.updateState({ ...newState });
  }

  private getCurrentState(): Promise<ErrorsState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: ErrorsState) {
    this.store.next(state);
  }

}
