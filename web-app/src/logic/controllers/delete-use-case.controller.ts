import {UseCaseRepository} from '../repositories/use-case.repository';

export class DeleteUseCaseController {
    constructor(private repository: UseCaseRepository) {

    }

  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }



}
