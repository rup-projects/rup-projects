import  { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../../logic/models/project';

export class CreateProjectFormGroup extends UntypedFormGroup {
  constructor() {
    super({
      startDate: new UntypedFormControl(null, Validators.required),
      endDate: new UntypedFormControl(null, Validators.required),
      cost: new UntypedFormControl(1000, Validators.required),
    });
  }

  getRawValue(): Project {
    return super.getRawValue();
  }

  get startDate(): UntypedFormControl {
    return this.get('startDate') as UntypedFormControl;
  }

  get endDate(): UntypedFormControl {
    return this.get('endDate') as UntypedFormControl;
  }

  get cost(): UntypedFormControl {
    return this.get('cost') as UntypedFormControl;
  }

}
