import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class UpdateMemberController implements Controller<Member, ControllerResponse<null>> {

  constructor(private repository: MemberRepository) {
  }

  async execute(member: Member): Promise<ControllerResponse<null>> {
    try {
      await this.repository.update(member.id, member);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
