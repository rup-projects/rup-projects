import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UseCase } from '../models/use-case';

@Injectable()
export class UseCaseService {

  URL_BASE: string = 'http://localhost:8080';

  private RESOURCE: string = 'use-cases';

  constructor(private httpClient: HttpClient) {
  }

  openUseCases(): Observable<UseCase[]> {
    return this.httpClient.get<UseCase[]>(`${this.URL_BASE}/${this.RESOURCE}`);
  }

  createUseCase(useCase: UseCase): Promise<UseCase> {
    return this.httpClient.post<UseCase>(`${this.URL_BASE}/${this.RESOURCE}`, {...useCase})
      .pipe(map((json: any): UseCase => UseCase.build(json)))
      .toPromise()
  }

  updateUseCase(useCase: UseCase): Promise<UseCase> {
    return this.httpClient.put<UseCase>(`${this.URL_BASE}/${this.RESOURCE}/${useCase.id}`, {...useCase})
      .pipe(map((json: any): UseCase => UseCase.build(json)))
      .toPromise()
  }

  delete(id: number): Promise<void> {
    return this.httpClient.delete<void>(`${this.URL_BASE}/${this.RESOURCE}/${id}`).toPromise();
  }
}
