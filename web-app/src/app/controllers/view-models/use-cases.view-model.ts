import { Injectable } from '@angular/core';
import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import {UseCase} from '../../../logic/models/use-case';
import {UseCasesViewModeValueStore} from './type/usecases-view-mode-value-store';

@Injectable()
export class UseCasesViewModel extends AbstractViewModelStorage<UseCase[]> {
  protected getInitialValue(): UseCasesViewModeValueStore {
    return new UseCasesViewModeValueStore();
  }
}


