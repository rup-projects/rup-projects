import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import { Project } from '../../../logic/models/project';
import { Injectable } from '@angular/core';
import { ViewModelValueStore } from '../../../logic/controllers/types/view-model-value-store';

@Injectable()
export class ProjectViewModel extends AbstractViewModelStorage<Project> {

  public getInitialValue(): ViewModelValueStore<Project> {
    console.log('hola');
    return  { value: null };
  }

}


