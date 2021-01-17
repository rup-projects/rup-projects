import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resourceServer } from '../../environments/environment';
import { UseCase } from '../models/use-case';

@Injectable()
export class UseCaseService {

  private RESOURCE = 'use-cases';

  constructor(private httpClient: HttpClient) {
  }

  openUseCases(): Observable<UseCase[]> {
    return this.httpClient.get<UseCase[]>(`${resourceServer}/${this.RESOURCE}`);
  }

  createUseCase(useCase: UseCase): Promise<UseCase> {
    return this.httpClient.post<UseCase>(`${resourceServer}/${this.RESOURCE}`, {...useCase})
      .pipe(map((json: any): UseCase => UseCase.build(json)))
      .toPromise();
  }

  updateUseCase(useCase: UseCase): Promise<UseCase> {
    return this.httpClient.put<UseCase>(`${resourceServer}/${this.RESOURCE}/${useCase.id}`, {...useCase})
      .pipe(map((json: any): UseCase => UseCase.build(json)))
      .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${resourceServer}/${this.RESOURCE}/${id}`).toPromise();
  }
}
