import { Injectable } from '@angular/core';
import { resourceServer } from '../../environments/environment';
import { ProjectDao } from '../../logic';
import { PlanProjectDto } from '../../logic/models/planProjectDto';
import { Project } from '../../logic/models/project';
import { HttpService } from '../../commons/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDaoImpl implements ProjectDao {

  private RESOURCE = 'projects';

  constructor(private httpService: HttpService) {
  }

  create(project: PlanProjectDto): Promise<Project> {
    const httpResult = this.httpService.post(`${resourceServer}/${this.RESOURCE}`, project);
    return httpResult.toPromise();
  }

  delete(id: string): Promise<any> {
    const httpResult = this.httpService.delete(`${resourceServer}/${this.RESOURCE}`);
    return httpResult.toPromise();
  }

  getAll(): Promise<any> {
    const httpResult = this.httpService.get(`${resourceServer}/${this.RESOURCE}/opened`);
    return httpResult.toPromise();
  }

}
