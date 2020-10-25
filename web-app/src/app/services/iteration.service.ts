import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServer } from '../../environments/environment';
import { Iteration } from '../models/iteration';

@Injectable()
export class IterationService {

  private RESOURCE = 'iterations';

  constructor(private httpClient: HttpClient) {
  }

  openIterations(): Observable<Iteration[]> {
    return this.httpClient.get<Iteration[]>(`${resourceServer}/${this.RESOURCE}`);
  }

  openIteration(iterationId: number): Observable<Iteration> {
    return this.httpClient.get<Iteration>(`${resourceServer}/${this.RESOURCE}/${iterationId}`);
  }
}
