import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {resourceServer} from '../../../environments/environment';
import {Project} from '../models/project';
import {PlanProjectDto} from '../models/planProjectDto';
import {HttpService} from '../../core/http.service';

@Injectable()
export class ProjectProxyService {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {
  }

  startSystem(): Observable<Project> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/opened`);
  }

  planProject(project: PlanProjectDto): Observable<Project> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
  }

  deleteProject(): Observable<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
  }

}


