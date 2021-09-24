import {MemberRole} from '../../app/controllers/dtos/member-role';
import {Id} from '../../commons/model/id';

export class Member {

  constructor(
    public id: Id,
    public name: string,
    public surName: string,
    public email: string,
    public role: MemberRole,
  ) {
  }

  static build(member: Member): Member {
    return new Member(member.id, member.name, member.surName, member.email, member.role);
  }

}
