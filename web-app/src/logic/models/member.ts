import {MemberRole} from '../../app/controllers/dtos/member-role';

export class Member {

  constructor(
    public id: number,
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
