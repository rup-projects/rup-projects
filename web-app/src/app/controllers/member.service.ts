import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { OpenMemberController } from '../../logic/controllers/open-member.controller';
import { OpenMembersController } from '../../logic/controllers/open-members.controller';
import { UpdateMemberController } from '../../logic/controllers/update-member.controller';
import { Member } from '../../logic/models/member';
import { MemberRepositoryImplService } from '../infrastructure/member-repository-impl.service';

@Injectable()
export class MemberService {

  private RESOURCE = 'members';

  constructor(private memberRepository: MemberRepositoryImplService, private httpService: HttpService) {
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
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
  }
}
