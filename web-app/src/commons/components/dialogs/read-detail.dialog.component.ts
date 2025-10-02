import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'read-detail.dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class ReadDetailDialogComponent {
  title: string;
  object: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.object = data.object;
  }

  labels(object): string[] {
    return Object.getOwnPropertyNames(object);
  }
}
