import { Injectable } from '@angular/core';
import { Member } from '../../../logic/models/member';
import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { MembersViewModeValueStore } from './type/members-view-mode-value-store';

@Injectable()
export class MembersViewModel extends AbstractViewModelStorage<Member[]> {
  protected getInitialValue(): MembersViewModeValueStore {
    return new MembersViewModeValueStore();
  }
}


