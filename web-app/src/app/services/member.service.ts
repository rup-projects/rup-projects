import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

  URL_BASE: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  openMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.URL_BASE}/members`);
  }

  createMember(member: Member): Promise<Member> {
    return this.httpClient.post<Member>(`${this.URL_BASE}/members`, {...member})
      .pipe(map((json: any): Member => Member.build(json)))
      .toPromise()
  }

  updateMember(member: Member): Promise<Member> {
    return this.httpClient.put<Member>(`${this.URL_BASE}/members/${member.id}`, {...member})
      .pipe(map((json: any): Member => Member.build(json)))
      .toPromise()
  }

  delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.URL_BASE}/members/${id}`).toPromise();
  }
}
