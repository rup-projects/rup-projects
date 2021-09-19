import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ReadableViewModel } from '../../commons/services/types/readable-view-model';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { DeleteMemberController } from '../../logic/controllers/delete-member.controller';
import { OpenMemberController } from '../../logic/controllers/open-member.controller';
import { OpenMembersController } from '../../logic/controllers/open-members.controller';
import { UpdateMemberController } from '../../logic/controllers/update-member.controller';
import { Member } from '../../logic/models/member';
import { MemberRepositoryImplService } from '../infrastructure/member-repository-impl.service';
import { MembersViewModel } from './view-models/members.view-model';

@Injectable()
export class MemberService {

  constructor(private memberRepository: MemberRepositoryImplService,
              private membersViewModel: MembersViewModel) {
  }

  getViewModel(): ReadableViewModel<Member[]> {
    return this.membersViewModel;
  }

  async openMembers(): Promise<void> {
    const command = new OpenMembersController(this.memberRepository);
    const result = await command.execute();
    this.membersViewModel.setValue(result);
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
