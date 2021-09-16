import { BehaviorSubject, Observable } from "rxjs";
import { DataState } from "./definitions/data-state";
import { OnDestroy } from '@angular/core';

export interface ICommandReceptor<T> {
    setValue(value: T): void;
    getState(): Observable<DataState<T>>;
}

export abstract class AbstractCommandReceptor<T> implements ICommandReceptor<T> {

    private dataStore: BehaviorSubject<DataState<T>>;
    private state$: Observable<DataState<T>>;

    constructor() {
        this.dataStore = new BehaviorSubject<DataState<T>>(this.getInitialData());
        this.state$ = this.dataStore.asObservable();
    }

    protected abstract getInitialData(): DataState<T>;

    public setValue(value: T): void {
        const _state: DataState<T> = { ...this.getInitialData(), data: value };
        this.dataStore.next(_state);
    }

    public getState(): Observable<DataState<T>> {
        return this.state$;
    }

    protected destroyDataStore(): void {
        this.dataStore.next(null);
    }



}
