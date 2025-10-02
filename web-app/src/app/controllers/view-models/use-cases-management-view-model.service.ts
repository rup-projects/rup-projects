import { Injectable } from '@angular/core';
import {UseCase} from '../../../logic/models/use-case';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, first, map} from 'rxjs/operators';

interface UseCasesVmState {
  selectedUseCase: UseCase;
  useCases: UseCase[];
}


const DEFAULT_STATE: UseCasesVmState = {
  selectedUseCase: null,
  useCases: []
};

@Injectable()
export class UseCasesManagementViewModel {

  private store: BehaviorSubject<UseCasesVmState>;
  private state$: Observable<UseCasesVmState>;

  constructor() {
    this.store = new BehaviorSubject(DEFAULT_STATE);
    this.state$ = this.store.asObservable();
  }

  public resetStore(): void {
    this.store.next(DEFAULT_STATE);
  }

  private getCurrentState(): Promise<UseCasesVmState> {
    return this.state$.pipe(first()).toPromise();
  }

  private updateState(state: UseCasesVmState): void {
    this.store.next(state);
  }

  public get selectedUseCase$(): Observable<UseCase> {
    return this.state$.pipe(map(state => state.selectedUseCase), distinctUntilChanged());
  }

  public get useCases$(): Observable<UseCase[]> {
    return this.state$.pipe(map(state => state.useCases), distinctUntilChanged());
  }

  public async dispatchSelectedUseCase(selectedUseCase: UseCase): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, selectedUseCase });
  }

  public async dispatchUseCases(useCases: UseCase[]): Promise<void> {
    const currentState = await this.getCurrentState();
    this.updateState({ ...currentState, useCases });
  }


}


