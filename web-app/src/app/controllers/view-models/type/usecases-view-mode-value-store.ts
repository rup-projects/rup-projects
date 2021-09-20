import { ViewModelValueStore } from '../../../../commons/services/types/view-model-value-store';
import {UseCase} from '../../../../logic/models/use-case';

export class UseCasesViewModeValueStore implements ViewModelValueStore<UseCase[]> {
  value: UseCase[];
}
