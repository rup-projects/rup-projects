import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import { Member } from '../../logic/models/member';
import { MemberRepository } from '../../logic/repositories/member.repository';
import { MemberDto } from '../controllers/dtos/member-dto';

@Injectable({
  providedIn: 'root'
})
export class MemberRepositoryImplService implements MemberRepository {

  private RESOURCE = 'members';

  constructor(private httpService: HttpService) {
  }

  getOne(id: number): Promise<Member> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  create(project: MemberDto): Promise<void> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
    return httpResult.toPromise();
  }

  delete(id: number): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<Member[]> {
    const httpResult: Observable<Member[]> = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  update(id: number, dto: Member): Promise<void> {
    const httpResult: Observable<void> = this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto);
    return httpResult.toPromise();
  }

}
