import {GetAllDao, CreateDao, DeleteOneDao} from '../../commons/services/base.dao';
import {Project, CreateProjectDto} from '../models/project';
import {Id} from '../../commons/model/id';

export interface ProjectRepository extends GetAllDao<Project[]>, CreateDao<CreateProjectDto, Project>, DeleteOneDao<Id, void> {

  getPlanned(planProject: CreateProjectDto): Promise<Project>;

}


