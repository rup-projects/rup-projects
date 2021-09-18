import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import { Member } from '../models/member';

export interface MemberRepository extends GetAllDao<Member[]>, GetOneDao<number, Member>, CreateDao<Member, void>,
  UpdateDao<number, Member, void>, DeleteOneDao<number, any> {
}

