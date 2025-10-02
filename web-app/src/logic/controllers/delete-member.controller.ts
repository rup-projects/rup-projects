import { Controller } from '../../commons/services/types/controller';
import { MemberRepository } from '../repositories/member.repository';
import {Id} from '../../commons/model/id';
import {ControllerResponseFactory} from './core/controller-response.factory';
import {ControllerResponse} from './core/types/controller-response';

export class DeleteMemberController implements Controller<Id, ControllerResponse<null>> {

  constructor(private repository: MemberRepository) {
  }

  async execute(id: Id): Promise<ControllerResponse<null>> {
    try {
      await this.repository.delete(id);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
