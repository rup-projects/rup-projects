import { CreateDao, DeleteOneDao, GetAllDao, GetOneDao, UpdateDao } from '../../commons/services/base.dao';
import {Member, createMemberDto} from '../models/member';
import {Id} from '../../commons/model/id';

export interface MemberRepository extends GetAllDao<Member[]>, GetOneDao<Id, Member>, CreateDao<createMemberDto, void>,
  UpdateDao<Id, Member, void>, DeleteOneDao<number, any> {
}

