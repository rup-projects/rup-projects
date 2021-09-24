import {GetAllDao, CreateDao, DeleteOneDao} from '../../commons/services/base.dao';
import {PlanProject} from '../models/planProject';
import {Project} from '../models/project';

export interface ProjectRepository extends GetAllDao<Project[]>, CreateDao<PlanProject, Project>, DeleteOneDao<string, any> {

  getPlanned(planProject: PlanProject): Promise<Project>;

}


