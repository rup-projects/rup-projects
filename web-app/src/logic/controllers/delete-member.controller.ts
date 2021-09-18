import { Controller } from '../../commons/services/types/controller';
import { MemberRepository } from '../repositories/member.repository';

export class DeleteMemberController implements Controller<number, void> {

  constructor(private repository: MemberRepository) {
  }

  async execute(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    return result;
  }
}
