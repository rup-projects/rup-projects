import {Id} from '../../types/id';

export interface UseCase {
  id: Id;
  name: string;
  description: string;
  priority: number;
}


