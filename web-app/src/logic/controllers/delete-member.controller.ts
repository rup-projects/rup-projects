import { Controller } from '../../commons/services/types/controller';
import { MemberRepository } from '../repositories/member.repository';
import {Id} from '../../commons/model/id';

export class DeleteMemberController implements Controller<Id, void> {

  constructor(private repository: MemberRepository) {
  }

  async execute(id: Id): Promise<void> {
    const result = await this.repository.delete(id);
    return result;
  }
}
