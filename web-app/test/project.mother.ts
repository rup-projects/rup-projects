import {Project, CreateProjectDto} from '../src/logic/models/project';

export class ProjectMother {

  static planProjectRequest(): CreateProjectDto {
    return {startDate: new Date(2021, 1, 1), endDate: new Date(2021, 12, 31), numberOfIterations: 20, cost: 1000};
  }

  static plannedProject(): Project {
    return {
      id: 1,
      startDate: new Date(2021, 1, 1),
      endDate: new Date(2021, 12, 31),
      numberOfIterations: 20,
      cost: 1000,
      phases: [],
      iterationSize: 20
    };
  }

}
