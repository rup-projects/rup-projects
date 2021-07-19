import {GetAllDao, CreateDao, DeleteOneDao} from './base/base.dao';
import {PlanProjectDto} from '../models/planProjectDto';
import {Project} from '../models/project';

export interface ProjectDao extends GetAllDao<Project>, CreateDao<PlanProjectDto, Project>, DeleteOneDao<string, any> {}

