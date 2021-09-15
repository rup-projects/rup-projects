import {GetAllDao, CreateDao, DeleteOneDao} from '../../commons/services/base.dao';
import {PlanProjectDto} from '../models/planProjectDto';
import {Project} from '../models/project';

export interface ProjectRepository extends GetAllDao<Project>, CreateDao<PlanProjectDto, Project>, DeleteOneDao<string, any> {}

