export interface Command<T, E> {
    execute(param?: T): E | Promise<E>;
}
