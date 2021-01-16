import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServer } from '../../environments/environment';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {

  private RESOURCE = 'projects';

  constructor(private httpClient: HttpClient) {
  }

  startSystem(): Observable<Project> {
    return this.httpClient.get<Project>(`${resourceServer}/${this.RESOURCE}/opened`);
  }

  planProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(`${resourceServer}/${this.RESOURCE}`, project);
  }

  deleteProject(): Promise<void> {
    return this.httpClient.delete<void>(`${resourceServer}/${this.RESOURCE}`).toPromise();
  }
}
