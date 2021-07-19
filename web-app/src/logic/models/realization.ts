import {Activity} from './activity';
import {Member} from './member';

export interface Realization {

    id: number;
    member: Member;
    activities: Activity[];

}
