import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import {UseCase, createUseCaseDto} from '../models/use-case';
import {Id} from '../../commons/model/id';

export interface UseCaseRepository extends GetAllDao<UseCase[]>, GetOneDao<Id, UseCase>, CreateDao<createUseCaseDto, void>,
  UpdateDao<Id, UseCase, void>, DeleteOneDao<Id, any> {
}

