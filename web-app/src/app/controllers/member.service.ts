import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { DeleteMemberController } from '../../logic/controllers/delete-member.controller';
import { OpenMemberController } from '../../logic/controllers/open-member.controller';
import { OpenMembersController } from '../../logic/controllers/open-members.controller';
import { UpdateMemberController } from '../../logic/controllers/update-member.controller';
import { Member } from '../../logic/models/member';
import { MemberRepositoryImplService } from '../infrastructure/member-repository-impl.service';

@Injectable()
export class MemberService {

  constructor(private memberRepository: MemberRepositoryImplService) {
  }

  openMembers(): Observable<Member[]> {
    const command = new OpenMembersController(this.memberRepository);
    return from(command.execute());
  }

  openMember(id: number): Observable<Member> {
    const command = new OpenMemberController(this.memberRepository);
    return from(command.execute(id));
  }

  createMember(member: Member): Observable<void> {
    const command = new CreateMemberController(this.memberRepository);
    return from(command.execute(member));
  }

  updateMember(member: Member): Observable<void> {
    const command = new UpdateMemberController(this.memberRepository);
    return from(command.execute(member));
  }

  deleteMember(id: number): Observable<void> {
    const command = new DeleteMemberController(this.memberRepository);
    return from(command.execute(id));
  }
}
