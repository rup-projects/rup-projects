import { GetAllDao, CreateDao, DeleteOneDao, GetOneDao } from '../../commons/services/base.dao';
import {Project, CreateProjectDto} from '../models/project';
import {Id} from '../../commons/model/id';

export interface ProjectRepository extends GetAllDao<Project[]>, CreateDao<CreateProjectDto, Project>, DeleteOneDao<Id, void>, GetOneDao<number, Project> {

  getPlanned(planProject: CreateProjectDto): Promise<Project>;

}


