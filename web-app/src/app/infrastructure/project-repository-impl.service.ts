import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import {Project, ProjectRequest} from '../../logic/models/project';
import { ProjectRepository } from '../../logic/repositories/project.repository';
import {Id} from '../../commons/model/id';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryImpl implements ProjectRepository {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {
  }

  getPlanned(planProject: ProjectRequest): Promise<Project> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}/planned`, planProject).toPromise();
  }

  create(project: ProjectRequest): Promise<Project> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
    return httpResult.toPromise();
  }

  delete(id: Id): Promise<void> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<Project[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

}
