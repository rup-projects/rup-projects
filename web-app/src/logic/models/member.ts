import {MemberRole} from './member-role';
import {Id} from '../../commons/model/id';
import {UseCase} from './use-case';

export interface Member {
  id: Id;
  name: string;
  surName: string;
  email: string;
  role: MemberRole;
}

export type createMemberDto = Omit<Member, 'id'>;

