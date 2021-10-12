import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ReadableViewModel } from '../../commons/services/types/readable-view-model';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { DeleteMemberController } from '../../logic/controllers/delete-member.controller';
import { OpenMemberController } from '../../logic/controllers/open-member.controller';
import { OpenMembersController } from '../../logic/controllers/open-members.controller';
import { UpdateMemberController } from '../../logic/controllers/update-member.controller';
import {Member, createMemberDto} from '../../logic/models/member';
import { MemberRestRepository } from '../infrastructure/member-rest-repository';
import { MembersViewModel } from './view-models/members.view-model';
import {MemberViewModel} from './view-models/member.view-model';
import {Id} from '../../commons/model/id';
import {ErrorViewModel} from '../../commons/services/view-models/error.view-model';

@Injectable()
export class MemberService {

  constructor(private memberRepository: MemberRestRepository,
              private membersViewModel: MembersViewModel,
              private errorViewModel: ErrorViewModel,
              private memberViewModel: MemberViewModel) {
  }

  public getMembersViewModel(): ReadableViewModel<Member[]> {
    return this.membersViewModel;
  }

  public getMemberViewModel(): ReadableViewModel<Member> {
    return this.memberViewModel;
  }

  async openMembers(): Promise<void> {
    const result = await new OpenMembersController(this.memberRepository).execute();
    if (result.isSuccess()) {
      this.membersViewModel.setValue(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async openMember(id: Id): Promise<void> {
    const result = await new OpenMemberController(this.memberRepository).execute(id);
    if (result.isSuccess()) {
      this.memberViewModel.setValue(result.data);
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
      this.memberViewModel.setValue(result.data);
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
