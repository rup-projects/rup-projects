import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import { CreateMemberController } from '../../logic/controllers/create-member.controller';
import { Member } from '../../logic/models/member';
import { MemberRepositoryImplService } from '../infrastructure/member-repository-impl.service';

@Injectable()
export class MemberService {

  private RESOURCE = 'members';

  constructor(private memberRepository: MemberRepositoryImplService, private httpService: HttpService) {
  }

  openMembers(): Observable<Member[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
  }

  openMember(id: number): Observable<Member> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
  }

  async createMember(member: Member): Promise<void> {
    const command = new CreateMemberController(this.memberRepository);
    await command.execute(member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${member.id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
  }
}
