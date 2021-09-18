import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import {UseCase} from '../models/use-case';

export interface UseCaseRepository extends GetAllDao<UseCase[]>, GetOneDao<number, UseCase>, CreateDao<UseCase, void>,
  UpdateDao<number, UseCase, void>, DeleteOneDao<number, any> {
}

