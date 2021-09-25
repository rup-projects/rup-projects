import {GetAllDao, CreateDao, DeleteOneDao} from '../../commons/services/base.dao';
import {Project, ProjectRequest} from '../models/project';
import {Id} from '../../commons/model/id';

export interface ProjectRepository extends GetAllDao<Project[]>, CreateDao<ProjectRequest, Project>, DeleteOneDao<Id, void> {

  getPlanned(planProject: ProjectRequest): Promise<Project>;

}


