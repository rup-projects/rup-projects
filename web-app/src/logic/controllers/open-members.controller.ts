import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class OpenMembersController implements Controller<void, ControllerResponse<Member[]>> {

  constructor(private repository: MemberRepository) {
  }

  async execute(): Promise<ControllerResponse<Member[]>> {
    try {
      const result = await this.repository.getAll();
      return ControllerResponseFactory.createSuccess(result);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
