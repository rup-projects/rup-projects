import { Injectable } from '@angular/core';
import { Member } from '../../../logic/models/member';
import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import {MemberViewModeValueStore} from './type/member-view-mode-value-store';

@Injectable()
export class MemberViewModel extends AbstractViewModelStorage<Member> {
  protected getInitialValue(): MemberViewModeValueStore {
    return new MemberViewModeValueStore();
  }
}


