import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import {Member, createMemberDto} from '../../logic/models/member';
import { MemberRepository } from '../../logic/repositories/member.repository';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class MemberRestRepository implements MemberRepository {

  private RESOURCE = 'members';

  constructor(private httpService: HttpService) {
  }

  getOne(id: Id): Promise<Member> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  create(member: createMemberDto): Promise<void> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, member);
    return httpResult.toPromise();
  }

  delete(id: Id): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<Member[]> {
    const httpResult: Observable<Member[]> = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  update(id: Id, dto: Member): Promise<void> {
    const httpResult: Observable<void> = this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto);
    return httpResult.toPromise();
  }

}
