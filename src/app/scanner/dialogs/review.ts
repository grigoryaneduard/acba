import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {File} from '../api/models/file';
import {Observable} from 'rxjs';
import {FileClass} from '../api/models/file-class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {FileActions} from '../actions';
import {Store} from '@ngrx/store';
import * as fromScanner from '../reducers';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'review-dialog',
  templateUrl: './review-dialog.html',
  styles: [`
      .class-types {
          width: 50%;
      }`
  ],
})
// tslint:disable-next-line:component-class-suffix
export class ReviewDialog implements OnInit {
  classes: FileClass[];
  file: File;
  stateCtrl = new FormControl();
  filteredStates: Observable<FileClass[]>;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialog>,
    private snackBar: MatSnackBar,
    private store: Store<fromScanner.State>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.classes = data.classes;
    this.file = data.file;
    this.stateCtrl.patchValue(data.file.class?.name);
  }

  ngOnInit(): void {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.classes.slice())
      );
  }

  private _filterStates(value: string): FileClass[] {
    const filterValue = value.toLowerCase();

    return this.classes.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEdit() {
    const selected = this.stateCtrl.value;
    if (selected === undefined) {
      this.snackBar.open('Please select class', '', {duration: 3000});
    } else if (this.file.class?.name === selected) {
      this.snackBar.open('You have selected some class', '', {duration: 3000});
    } else {
      const cl = this.classes.filter((c: FileClass) => c.name === selected)[0] as FileClass;
      this.store.dispatch(FileActions.editFile({
        file: {
          ...this.file,
          class_id: cl.id,
          class: cl
        }
      }));

      this.dialogRef.close();
    }
  }
}
