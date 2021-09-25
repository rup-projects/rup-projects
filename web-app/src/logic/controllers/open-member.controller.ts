import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';
import {Id} from '../../commons/model/id';

export class OpenMemberController implements Controller<number, Member> {

  constructor(private repository: MemberRepository) {
  }

  async execute(id: Id): Promise<Member> {
    const result = await this.repository.getOne(id);
    return result;
  }
}
