import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import {UseCaseRepository} from '../../logic/repositories/use-case.repository';
import {UseCase, createUseCaseDto} from '../../logic/models/use-case';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class UseCaseRestRepository implements UseCaseRepository {

  private RESOURCE = 'use-cases';

  constructor(private httpService: HttpService) {
  }

  getOne(id: Id): Promise<UseCase> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  create(useCase: createUseCaseDto): Promise<void> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, useCase);
    return httpResult.toPromise();
  }

  delete(id: Id): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<UseCase[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  update(id: Id, dto: UseCase): Promise<void> {
    const httpResult = this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto);
    return httpResult.toPromise();
  }

}
