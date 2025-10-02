import {anything, instance, mock, when} from 'ts-mockito';
import {ProjectRepository} from '../src/logic/repositories/project.repository';
import {ProjectMother} from './project.mother';
import {PlanProjectController} from '../src/logic/controllers/plan-project.controller';


describe('PlanProjectController', () => {

  it('should return planned project', async () => {
    const stubRepository = mock<ProjectRepository>();
    when(stubRepository.create(anything())).thenResolve(ProjectMother.plannedProject());
    when(stubRepository.getAll()).thenResolve([]);
    const planProjectController = new PlanProjectController(instance(stubRepository));

    const result = await planProjectController.execute(ProjectMother.planProjectRequest());

    expect(result).toEqual(ProjectMother.plannedProject());
  });
});
