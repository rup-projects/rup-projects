import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';

export class CreateMemberController implements Controller<Member, void> {

  constructor(private repository: MemberRepository) {
  }

  async execute(member: Member): Promise<void> {
    const result = await this.repository.create(member);
    return result;
  }
}
