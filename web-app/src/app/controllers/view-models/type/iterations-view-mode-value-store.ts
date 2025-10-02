import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import {Iteration} from '../../../../logic/models/iteration';

export class IterationsViewModeValueStore implements ViewModelValueStore<Iteration[]> {
  value: Iteration[];
}
