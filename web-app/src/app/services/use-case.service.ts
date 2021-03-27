import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resourceServer } from '../../environments/environment';
import { UseCase } from '../models/use-case';
import {HttpService} from "./http.service";

@Injectable()
export class UseCaseService {

  private RESOURCE = 'use-cases';

  constructor(private httpService: HttpService) {
  }

  openUseCases(): Observable<UseCase[]> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
  }

  openUseCase(id: number): Observable<UseCase> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/${id}`);
  }


  createUseCase(useCase: UseCase): Observable<UseCase> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}`, useCase);
  }

  updateUseCase(useCase: UseCase): Observable<UseCase> {
    return this.httpService
      .successful()
      .put(`${resourceServer}/${this.RESOURCE}/${useCase.id}`, useCase);
  }

  delete(id: number): Promise<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }
}
