export interface Controller<T, E> {
    execute(param?: T): E | Promise<E>;
}
