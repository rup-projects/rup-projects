import {Role} from './role.model';

export interface User {
  token: string;
  mobile?: number;
  name?: string;
  role?: Role;
}
