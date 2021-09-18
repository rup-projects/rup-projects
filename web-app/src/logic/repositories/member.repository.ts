import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import { Member } from '../models/member';

export interface MemberRepository extends GetAllDao<Member[]>, GetOneDao<number, Member>, CreateDao<Member, Member>,
  UpdateDao<string, Member, void>, DeleteOneDao<string, any> {
}

