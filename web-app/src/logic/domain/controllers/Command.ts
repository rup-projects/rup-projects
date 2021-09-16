export interface Command<T> {
    execute(param: T): void | Promise<void>;
}
