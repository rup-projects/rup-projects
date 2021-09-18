import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';

export class UpdateMemberController implements Controller<Member, void> {

  constructor(private repository: MemberRepository) {
  }

  async execute(param: Member): Promise<void> {
    const result = await this.repository.update(param.id, param);
    return result;
  }
}
