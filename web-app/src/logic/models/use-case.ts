import {Id} from '../../commons/model/id';

export interface UseCase {
  id: Id;
  name: string;
  description: string;
  priority: number;
}

export type createUseCaseDto = Omit<UseCase, 'id'>;


