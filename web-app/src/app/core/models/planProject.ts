import {Project} from './project';

export type PlanProject = Pick<Project, 'startDate' | 'endDate' | 'cost' | 'numberOfIterations'>;
