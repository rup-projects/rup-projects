import {UntypedFormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

export class ProjectDateValidator {

    static afterNow(control: UntypedFormControl): any {
        if (new Date(control.value).getTime() < Date.now()) {
            return {'afterNow': true};
        } else {
            return null;
        }
    }

    static minimumDateRange(endDateControl: string): any {
        const diff = (e, t) => Math.floor((new Date(e).getTime() - new Date(t).getTime()) / 86400000);

        return (c: UntypedFormControl) => {
            const endDateToCompare = c.root.get(endDateControl);
            if (endDateToCompare) {
                const subs: Subscription = endDateToCompare.valueChanges.subscribe(() => {
                    c.updateValueAndValidity();
                    subs.unsubscribe();
                });
            }
            return endDateToCompare && diff(endDateToCompare.value, c.value) > 100 ? {'lowDateRange': true} : null;
        };
    }
}
