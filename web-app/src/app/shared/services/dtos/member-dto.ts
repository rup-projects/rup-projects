import {Id} from '../../types/id';
import {ActivityDto} from './activity-dto';
import {MemberRole} from '../../types/member-role';

export interface MemberDto {

  id: Id;
  name: string;
  surName: string;
  email: string;
  role: MemberRole;
  activities: ActivityDto[];

}
