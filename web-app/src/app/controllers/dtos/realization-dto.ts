import {Id} from '../../../commons/model/id';
import {ActivityDto} from './activity-dto';
import {MemberDto} from './member-dto';

export interface RealizationDto {

    id: Id;
    member: MemberDto;
    activities: ActivityDto[];

}
