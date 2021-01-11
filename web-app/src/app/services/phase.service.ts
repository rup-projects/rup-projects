import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServer } from '../../environments/environment';
import { Phase } from '../models/phase';
import {Iteration} from "../models/iteration";

@Injectable()
export class PhaseService {

  private RESOURCE = 'phases';

  constructor(private httpClient: HttpClient) {
  }

  openPhases(): Observable<Phase[]> {
    return this.httpClient.get<Phase[]>(`${resourceServer}/${this.RESOURCE}`);
  }

  openIterations(phaseId: string): Observable<Iteration[]> {
    return this.httpClient.get<Iteration[]>(`${resourceServer}/${this.RESOURCE}/${phaseId}/iterations`);
  }


}
