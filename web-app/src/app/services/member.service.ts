import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resourceServer } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

  private RESOURCE = 'members';

  constructor(private httpClient: HttpClient) {
  }

  openMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${resourceServer}/${this.RESOURCE}`);
  }

  createMember(member: Member): Promise<Member> {
    return this.httpClient.post<Member>(`${resourceServer}/${this.RESOURCE}`, {...member})
      .pipe(map((json: any): Member => Member.build(json)))
      .toPromise()
  }

  updateMember(member: Member): Promise<Member> {
    return this.httpClient.put<Member>(`${resourceServer}/${this.RESOURCE}/${member.id}`, {...member})
      .pipe(map((json: any): Member => Member.build(json)))
      .toPromise()
  }

  delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }
}
