import {GetAllDao, CreateDao, DeleteOneDao} from '../../commons/services/base.dao';
import {Project, ProjectRequest} from '../models/project';

export interface ProjectRepository extends GetAllDao<Project[]>, CreateDao<ProjectRequest, Project>, DeleteOneDao<string, any> {

  getPlanned(planProject: ProjectRequest): Promise<Project>;

}


