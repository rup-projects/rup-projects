import { Controller } from '../../commons/services/types/controller';
import { Member } from '../models/member';
import { MemberRepository } from '../repositories/member.repository';
import {Id} from '../../commons/model/id';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class OpenMemberController implements Controller<number, ControllerResponse<Member>> {

  constructor(private repository: MemberRepository) {
  }

  async execute(id: Id): Promise<ControllerResponse<Member>> {
    try {
      const result = await this.repository.getOne(id);
      return ControllerResponseFactory.createSuccess(result);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
