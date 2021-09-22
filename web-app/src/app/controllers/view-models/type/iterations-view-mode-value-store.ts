import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import {UseCase} from '../../../../logic/models/use-case';
import {Phase} from '../../../../logic/models/phase';
import {Iteration} from '../../../../logic/models/iteration';

export class IterationsViewModeValueStore implements ViewModelValueStore<Iteration[]> {
  value: Iteration[];
}
