import { Injectable } from '@angular/core';
import { HttpService } from '../../commons/services/http.service';
import { resourceServer } from '../../environments/environment';
import { PlanProject } from '../../logic/models/planProject';
import { Project } from '../../logic/models/project';
import { ProjectRepository } from '../../logic/repositories/project.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectRepositoryImpl implements ProjectRepository {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {
  }

  getPlanned(planProject: PlanProject): Promise<Project> {
    return this.httpService.post(`${resourceServer}/${this.RESOURCE}/planned`, planProject).toPromise();
  }

  create(project: PlanProject): Promise<Project> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
    return httpResult.toPromise();
  }

  delete(id: string): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<Project[]> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

}
