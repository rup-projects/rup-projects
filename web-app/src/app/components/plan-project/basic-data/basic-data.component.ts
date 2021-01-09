import { Component, Input } from '@angular/core';
import { CreateProjectFormGroup } from '../create-project-form-group';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html'
})
export class BasicDataComponent {

  @Input() form: CreateProjectFormGroup;

}
