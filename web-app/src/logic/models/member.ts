import {MemberRole} from './member-role';
import {Id} from '../../commons/model/id';

export interface Member {
  id: Id;
  name: string;
  surName: string;
  email: string;
  role: MemberRole;

}

