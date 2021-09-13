import {Id} from '../../../commons/model/id';
import {ActivityDto} from './activity-dto';
import {MemberRole} from './member-role';

export interface MemberDto {

  id: Id;
  name: string;
  surName: string;
  email: string;
  role: MemberRole;
  activities: ActivityDto[];

}
