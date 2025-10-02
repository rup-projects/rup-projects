import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {Member} from '../../../../../logic/models/member';

export class MemberFormGroup extends UntypedFormGroup {
  constructor() {
    super({
      id: new UntypedFormControl(),
      name: new UntypedFormControl(),
      surName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      role: new UntypedFormControl()
    });
  }

  getRawValue(): Member {
    return super.getRawValue();
  }

  get name(): UntypedFormControl {
    return this.get('name') as UntypedFormControl;
  }

  get surName(): UntypedFormControl {
    return this.get('surName') as UntypedFormControl;
  }

  get email(): UntypedFormControl {
    return this.get('email') as UntypedFormControl;
  }

  get role(): UntypedFormControl {
    return this.get('role') as UntypedFormControl;
  }

  get id(): UntypedFormControl {
    return this.get('id') as UntypedFormControl;
  }

}
