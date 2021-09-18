import { Observable } from 'rxjs';

export interface ReadableViewModel<T> {
  getStateValue(): Observable<T>;
}
