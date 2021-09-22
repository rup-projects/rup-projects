import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../commons/services/types/view-model-value-store';
import {Activity} from '../../../logic/models/activity';
import {ActivityViewModelValueStore} from './type/activity-view-mode-value-store';

@Injectable()
export class ActivityViewModel extends AbstractViewModelStorage<Activity> {

  public getInitialValue(): ViewModelValueStore<Activity> {
    return  new ActivityViewModelValueStore();
  }

}


