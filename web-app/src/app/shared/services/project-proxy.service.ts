import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {resourceServer} from '../../../environments/environment';
import {Project} from '../models/project';
import {HttpService} from '../../core/http.service';
import {map} from 'rxjs/operators';
import {PlanProject} from '../models/planProject';
import {DtoModelMapper} from './mappers/dto-model-mapper';

@Injectable()
export class ProjectProxyService {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {
  }

  startSystem(): Observable<Project> {
    return this.httpService.get(`${resourceServer}/${this.RESOURCE}/opened`)
      .pipe(map(DtoModelMapper.projectDtoToModel));
  }

  planProject(project: PlanProject): Observable<Project> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project)
      .pipe(map(DtoModelMapper.projectDtoToModel));
  }

  deleteProject(): Observable<void> {
    return this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
  }

}


