import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';

export class OpenMembersController implements Controller<void, Member[]> {

  constructor(private repository: MemberRepository) {
  }

  async execute(): Promise<Member[]> {
    const result = await this.repository.getAll();
    return result;
  }
}
