import { Command } from './Command';

export abstract class ApplicationService<ServiceParams> implements Command<ServiceParams> {
    abstract execute(params: ServiceParams): void;
}
