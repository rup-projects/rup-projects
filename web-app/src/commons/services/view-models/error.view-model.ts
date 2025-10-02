import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, map, tap } from 'rxjs/operators';
import { AppError } from '../../../logic/controllers/core/types/app-error';

interface ErrorState {
  error: AppError;
}

const DEFAULT_STATE: ErrorState = {
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class ErrorViewModel {

  private store: BehaviorSubject<ErrorState>;
  private state$: Observable<ErrorState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public get error$(): Observable<AppError> {
    return this.state$.pipe(map(state => state.error),
      filter(error => error !== null )
    );
  }

  public async dispatchAppError(appError: AppError): Promise<void> {
    if (appError) {
      const currentState = await this.getCurrentState();
      this.updateState({ ...currentState, error: appError });
    }
  }

  private getCurrentState(): Promise<ErrorState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: ErrorState): void {
    this.store.next(state);
  }

}
