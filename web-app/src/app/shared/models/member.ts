import { MemberRole } from './member-role.enum';
import {Activity} from './activity';

export class Member {

  constructor(
    public id: number,
    public name: string,
    public surName: string,
    public email: string,
    public role: MemberRole,
    public activities: Activity[]
  ) {
  }

  static build(member: Member): Member {
    return new Member(member.id, member.name, member.surName, member.email, member.role, member.activities);
  }

}
