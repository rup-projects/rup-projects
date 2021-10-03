import {Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorViewModel} from "../../services/view-models/error.view-model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-show-error',
  template: `<template #messagecontainer></template>`,
  styles: []
})
export class ShowErrorComponent implements OnInit {

  private timeout = 4000;

  constructor(
    private errorViewModel: ErrorViewModel,
    private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.errorViewModel.errors$.pipe().subscribe(errors => {
      if (errors.length > 0) {
        errors.forEach((error, index, errors) => {
          setTimeout(() => {
            const message = String(index+1) + ' of ' + (errors.length) + ' ' + error.message;
            this.snackBar.open(message, 'Error', { duration: this.timeout });
          }, index* (this.timeout+500));
        })
      }

    });
  }

}
