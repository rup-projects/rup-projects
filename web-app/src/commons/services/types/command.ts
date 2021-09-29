export interface Command {
    execute(param?: any): Promise<void>;
}
