import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {Iteration} from '../../../logic/models/iteration';
import {IterationViewModelValueStore} from './type/iteration-view-mode-value-store';

@Injectable()
export class IterationViewModel extends AbstractViewModelStorage<Iteration> {

  public getInitialValue(): ViewModelValueStore<Iteration> {
    return  new IterationViewModelValueStore();
  }

}


