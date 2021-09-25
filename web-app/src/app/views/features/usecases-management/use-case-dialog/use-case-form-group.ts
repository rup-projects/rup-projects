import { FormControl, FormGroup } from '@angular/forms';
import { UseCase } from '../../../../../logic/models/use-case';

export class UseCaseFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      priority: new FormControl(),
    });
  }

  getRawValue(): UseCase {
    return super.getRawValue();
  }

  get id(): FormControl {
    return this.get('id') as FormControl;
  }

  get name(): FormControl {
    return this.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.get('priority') as FormControl;
  }

  get priority(): FormControl {
    return this.get('priority') as FormControl;
  }

}
