import {NotAssignedCost} from './not-assigned-cost';
import {Realization} from './realization';



export interface Iteration {

    id: number;
    number: number;
    startDate: string;
    endDate: string;
    dateTimes: Date[];
    notAssignedCosts: NotAssignedCost[];
    realizations: Realization[];

}
