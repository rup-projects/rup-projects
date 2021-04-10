import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {resourceServer} from '../../../environments/environment';
import {Member} from '../models/member';
import {HttpService} from '../../core/http.service';

@Injectable()
export class MemberProxyService {

  private RESOURCE = 'members';

  constructor(private httpService: HttpService) {
  }

  openMembers(): Observable<Member[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
  }

  openMember(id: number): Observable<Member> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
  }

  createMember(member: Member): Observable<Member> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}`, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.httpService.put(`${resourceServer}/${this.RESOURCE}/${member.id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
  }
}
