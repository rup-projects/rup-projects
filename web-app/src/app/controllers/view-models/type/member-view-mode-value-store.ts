import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import { Member } from '../../../../logic/models/member';

export class MemberViewModeValueStore implements ViewModelValueStore<Member> {
  value: Member;
}
