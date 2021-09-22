import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {Realization} from '../../../logic/models/realization';
import {RealizationsViewModeValueStore} from './type/realizations-view-mode-value-store';

@Injectable()
export class RealizationsViewModel extends AbstractViewModelStorage<Realization[]> {

  public getInitialValue(): ViewModelValueStore<Realization[]> {
    return new RealizationsViewModeValueStore();
  }

}


