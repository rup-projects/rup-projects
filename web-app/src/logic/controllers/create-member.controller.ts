import { Controller } from '../../commons/services/types/controller';
import {Member, createMemberDto} from '../models/member';
import { MemberRepository } from '../repositories/member.repository';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class CreateMemberController implements Controller<createMemberDto, ControllerResponse<null>> {

  constructor(private repository: MemberRepository) {
  }

  async execute(member: createMemberDto): Promise<ControllerResponse<null>> {
    try {
      await this.repository.create(member);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
