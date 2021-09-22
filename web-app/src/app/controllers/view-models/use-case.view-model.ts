import { Injectable } from '@angular/core';
import { AbstractViewModelStorage } from './type/abstract-view-model-storage';
import {UseCase} from '../../../logic/models/use-case';
import {UseCaseViewModeValueStore} from './type/usecase-view-mode-value-store';

@Injectable()
export class UseCaseViewModel extends AbstractViewModelStorage<UseCase> {
  protected getInitialValue(): UseCaseViewModeValueStore {
    return new UseCaseViewModeValueStore();
  }
}


