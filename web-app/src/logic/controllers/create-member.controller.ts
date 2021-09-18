import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';

export class CreateMemberController implements Controller<Member, Member> {

  constructor(private repository: MemberRepository) {
  }

  async execute(param: Member): Promise<Member> {
    const result = await this.repository.create(param);
    return result;
  }
}
