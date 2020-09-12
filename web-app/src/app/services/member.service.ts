import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

  openMembers(): Observable<Member[]> {
    return of([
      new Member(1, 'Pedro'),
      new Member(2, 'Yllia'),
      new Member(3, 'Luis')
    ])
  }
  
}
