import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WritableViewModel } from '../../../../commons/services/types/writable-view-model';
import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import { ReadableViewModel } from '../../../../commons/services/types/readable-view-model';

export abstract class AbstractViewModelStorage<T> implements ReadableViewModel<T>, WritableViewModel<T> {

  private valueStore: BehaviorSubject<ViewModelValueStore<T>>;
  private state$: Observable<ViewModelValueStore<T>>;

  constructor() {
    this.valueStore = new BehaviorSubject<ViewModelValueStore<T>>(this.getInitialValue());
    this.state$ = this.valueStore.asObservable();
  }

  protected abstract getInitialValue(): ViewModelValueStore<T>;

  public getStateValue(): Observable<T> {
    return this.state$.pipe(map(v => v.value ));
  }

  public setValue(value: T): void {
    const newState: ViewModelValueStore<T> = { ...this.getInitialValue(), value };
    this.valueStore.next(newState);
  }

  public emptyValueStore(): void {
    this.valueStore.next(null);
  }

}
