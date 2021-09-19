import { Injectable } from '@angular/core';
import { Member } from '../../../logic/models/member';
import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { MembersViewModeValueStore } from './type/members-view-mode-value-store';
import {UseCase} from '../../../logic/models/use-case';
import {UseCasesViewModeValueStore} from './type/usecases-view-mode-value-store';

@Injectable()
export class UseCasesViewModel extends AbstractViewModelStorage<UseCase[]> {
  protected getInitialValue(): UseCasesViewModeValueStore {
    return new UseCasesViewModeValueStore();
  }
}


