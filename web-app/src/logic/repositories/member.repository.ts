import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import { Member } from '../models/member';
import {Id} from '../../commons/model/id';

export interface MemberRepository extends GetAllDao<Member[]>, GetOneDao<Id, Member>, CreateDao<Member, void>,
  UpdateDao<Id, Member, void>, DeleteOneDao<number, any> {
}

