import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Project } from '../../../logic/models/project';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {Phase} from '../../../logic/models/phase';
import {PhasesViewModeValueStore} from './type/phases-view-mode-value-store';

@Injectable()
export class PhasesViewModel extends AbstractViewModelStorage<Phase[]> {

  public getInitialValue(): PhasesViewModeValueStore {
    return  new PhasesViewModeValueStore();
  }

}


