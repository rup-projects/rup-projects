import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../models/member';

export class MemberFormGroup extends FormGroup {
  constructor() {
    super({
      id: new FormControl(),
      name: new FormControl(),
      surName: new FormControl(),
      email: new FormControl(),
      role: new FormControl()
    });
  }

  getRawValue(): Member {
    return Member.build(super.getRawValue());
  }

  get name(): FormControl {
    return this.get('name') as FormControl;
  }

  get surName(): FormControl {
    return this.get('surName') as FormControl;
  }

  get email(): FormControl {
    return this.get('email') as FormControl;
  }

  get role(): FormControl {
    return this.get('role') as FormControl;
  }

  get id(): FormControl {
    return this.get('id') as FormControl;
  }

}
