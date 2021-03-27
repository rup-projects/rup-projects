import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project';

export class CreateProjectFormGroup extends FormGroup {
  constructor() {
    super({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      cost: new FormControl(1000, Validators.required),
    });
  }

  getRawValue(): Project {
    return super.getRawValue();
  }

  get startDate(): FormControl {
    return this.get('startDate') as FormControl;
  }

  get endDate(): FormControl {
    return this.get('endDate') as FormControl;
  }

  get cost(): FormControl {
    return this.get('cost') as FormControl;
  }

}
