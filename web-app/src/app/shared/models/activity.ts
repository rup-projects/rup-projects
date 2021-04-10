import {DisciplineType} from './discipline.type';

export interface Activity {

    id: number;
    description: string;
    hours: number;
    disciplineType: DisciplineType;
    startDateTime: string;

}
