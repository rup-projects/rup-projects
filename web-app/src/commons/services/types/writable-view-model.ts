export interface WritableViewModel<T> {
  setValue(value: T): void;
  emptyValueStore(): void;
}
