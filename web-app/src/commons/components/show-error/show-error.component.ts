import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorViewModel} from '../../services/view-models/error.view-model';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-show-error',
  template: ``,
  styles: []
})
export class ShowErrorComponent implements OnInit {

  private timeout = 4000;

  constructor(
    private errorViewModel: ErrorViewModel,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.errorViewModel.error$.subscribe(error => {
        this.snackBar.open(error.message, 'Error', { duration: this.timeout });
    });
  }
}
