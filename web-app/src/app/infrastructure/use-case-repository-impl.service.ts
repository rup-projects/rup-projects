import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import {UseCaseRepository} from '../../logic/repositories/use-case.repository';
import {UseCase} from '../../logic/models/use-case';

@Injectable({
  providedIn: 'root'
})
export class UseCaseRepositoryImplService implements UseCaseRepository {

  private RESOURCE = 'use-cases';

  constructor(private httpService: HttpService) {
  }

  getOne(id: number): Promise<UseCase> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  create(useCase: UseCase): Promise<void> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, useCase);
    return httpResult.toPromise();
  }

  delete(id: number): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<UseCase[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  update(id: number, dto: UseCase): Promise<void> {
    const httpResult = this.httpService.put(`${resourceServer}/${this.RESOURCE}/${id}`, dto);
    return httpResult.toPromise();
  }

}
