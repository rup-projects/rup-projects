import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { DeleteMemberController } from '../../logic/controllers/delete-member.controller';
import { OpenMemberController } from '../../logic/controllers/open-member.controller';
import { OpenMembersController } from '../../logic/controllers/open-members.controller';
import { UpdateMemberController } from '../../logic/controllers/update-member.controller';
import {Member, createMemberDto} from '../../logic/models/member';
import { MemberRestRepository } from '../infrastructure/member-rest-repository';
import {Id} from '../../commons/model/id';
import {ErrorViewModel} from '../../commons/services/view-models/error.view-model';
import {MembersManagementViewModel} from './view-models/members-management.view-model';

@Injectable()
export class MemberService {

  constructor(private memberRepository: MemberRestRepository,
              private errorViewModel: ErrorViewModel,
              private membersManagementViewModel: MembersManagementViewModel) {
  }

  public getSelectedMember$(): Observable<Member> {
    return this.membersManagementViewModel.selectedMember$;
  }

  public getMembers$(): Observable<Member[]> {
    return this.membersManagementViewModel.members$;
  }

  async openMembers(): Promise<void> {
    const result = await new OpenMembersController(this.memberRepository).execute();
    if (result.isSuccess()) {
      await this.membersManagementViewModel.dispatchMembers(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async openMember(id: Id): Promise<void> {
    const result = await new OpenMemberController(this.memberRepository).execute(id);
    if (result.isSuccess()) {
      await this.membersManagementViewModel.dispatchSelectedMember(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async createMember(member: createMemberDto): Promise<void> {
    const result = await new CreateMemberController(this.memberRepository).execute(member);
    if (!result.isSuccess()) {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async updateMember(member: Member): Promise<void> {
    const result = await new UpdateMemberController(this.memberRepository).execute(member);
    if (result.isSuccess()) {
      await this.membersManagementViewModel.dispatchSelectedMember(result.data);
      await this.openMembers();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async deleteMember(id: Id): Promise<void> {
    const result = await new DeleteMemberController(this.memberRepository).execute(id);
    if (result.isSuccess()) {
      await this.openMembers();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }
}
