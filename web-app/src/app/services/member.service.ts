import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

  URL_BASE: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  openMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.URL_BASE}/members`);
  }

}
