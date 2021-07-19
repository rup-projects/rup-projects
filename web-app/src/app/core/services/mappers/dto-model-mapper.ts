import {ProjectDto} from '../dtos/project-dto';
import {Project} from '../../../../logic/models/project';
import {PhaseDto} from '../dtos/phase-dto';
import {Phase} from '../../../../logic/models/phase';
import {RealizationDto} from '../dtos/realization-dto';
import {Realization} from '../../../../logic/models/realization';
import {NotAssignedCostDto} from '../dtos/not-assigned-cost-dto';
import {NotAssignedCost} from '../../../../logic/models/not-assigned-cost';
import {MemberDto} from '../dtos/member-dto';
import {Member} from '../../../../logic/models/member';
import {IterationDto} from '../dtos/iteration-dto';
import {Iteration} from '../../../../logic/models/iteration';
import {ActivityDto} from '../dtos/activity-dto';
import {Activity} from '../../../../logic/models/activity';

export class DtoModelMapper {

  static projectDtoToModel(dto: ProjectDto): Project {
    return {
      id: dto.id,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      cost: dto.cost,
      phases: dto.phases.map(phaseDto => DtoModelMapper.phaseDtoToModel(phaseDto)),
      iterationSize: dto.iterationSize,
      numberOfIterations: dto.numberOfIterations
    };
  }

  static phaseDtoToModel(dto: PhaseDto): Phase {
    return {
      id: dto.id,
      type: dto.type,
      iterations: dto.iterations.map(iterationDto => DtoModelMapper.iterationDtoToModel(iterationDto)),
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      duration: dto.duration
    };
  }

  static iterationDtoToModel(dto: IterationDto): Iteration {
    return {
      id: dto.id,
      number: dto.number,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      notAssignedCosts: dto.notAssignedCosts
        .map(notAssignedCost => DtoModelMapper.notAssignedCostDtoToModel(notAssignedCost)),
      realizations: dto.realizations.map(realizationDto => DtoModelMapper.realizationDtoToModel(realizationDto))
    };
  }

  static activityDtoToModel(dto: ActivityDto): Activity {
    return {
      id: dto.id,
      description: dto.description,
      hours: dto.hours,
      startDateTime: new Date(dto.startDateTime)
    };
  }



  static realizationDtoToModel(dto: RealizationDto): Realization {
    return {
      id: dto.id,
      member: dto.member,
      activities: dto.activities.map(activityDto => DtoModelMapper.activityDtoToModel(activityDto))
    };
  }

  static notAssignedCostDtoToModel(dto: NotAssignedCostDto): NotAssignedCost {
    return {
      id: dto.id,
      type: dto.type,
      hours: dto.hours,
      notAssignedActivities: dto.notAssignedActivities.map(activityDto => DtoModelMapper.activityDtoToModel(activityDto))
    };
  }

  static MemberDtoToModel(dto: MemberDto): Member {
    return {
      id: dto.id,
      name: dto.name,
      surName: dto.surName,
      email: dto.email,
      role: dto.role
    };
  }



}
