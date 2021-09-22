import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import {UseCase} from '../../../../logic/models/use-case';
import {Phase} from '../../../../logic/models/phase';

export class PhasesViewModeValueStore implements ViewModelValueStore<Phase[]> {
  value: Phase[];
}
