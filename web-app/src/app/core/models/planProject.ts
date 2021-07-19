import {Project} from '../../../logic/models/project';

export type PlanProject = Pick<Project, 'startDate' | 'endDate' | 'cost' | 'numberOfIterations'>;
