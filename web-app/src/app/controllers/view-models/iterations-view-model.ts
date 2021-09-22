import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {Iteration} from '../../../logic/models/iteration';
import {IterationsViewModeValueStore} from './type/iterations-view-mode-value-store';

@Injectable()
export class IterationsViewModel extends AbstractViewModelStorage<Iteration[]> {

  public getInitialValue(): ViewModelValueStore<Iteration[]> {
    return  new IterationsViewModeValueStore();
  }

}


