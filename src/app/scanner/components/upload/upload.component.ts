import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {select, Store} from '@ngrx/store';
import * as fromScanner from '../../reducers';
import {ClassActions, FileActions} from '../../actions';
import {Observable} from 'rxjs';
import {File as FileModel, FileClass} from '../../api/models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ReviewDialog} from '../../dialogs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit {
  files$: Observable<FileModel[]>;
  error$: Observable<string>;
  filesLoading$: Observable<boolean>;
  classes$: Observable<FileClass[]>;
  classes: FileClass[];

  constructor(
    private store: Store<fromScanner.State>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.files$ = store.pipe(select(fromScanner.selectAllFiles));
    this.filesLoading$ = store.pipe(select(fromScanner.selectFileLoading));
    this.error$ = store.pipe(select(fromScanner.selectFilesError));
    this.classes$ = store.pipe(select(fromScanner.selectClasses));
  }

  ngOnInit(): void {
    this.store.dispatch(ClassActions.loadClasses());
    this.classes$.subscribe(data => this.classes = data);
    this.error$.subscribe(error => {
      if (error !== '') {
        this.snackBar.open(error, '', {duration: 3000});
      }
    });
  }

  openDialog(item: FileModel): void {
    this.dialog.open(ReviewDialog, {
      data: {
        file: item,
        classes: this.classes,
      },
      minWidth: '80%',
      minHeight: '100%',
    });
  }

  async dropped(files: NgxFileDropEntry[]) {
    const fileList = [];
    const initialFiles = [];

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const filePromise = new Promise(resolve => fileEntry.file((file: File) => {
          const blob = file.slice(0, file.size, file.type);
          const name = file.name.split('.');
          // todo :: add format to string -> `+ '.' + name[1]`
          const fileName = '[' + name[0] + ']' + btoa(file.name);
          const newFile = new File([blob], fileName, {type: file.type});
          resolve(newFile);
        }));
        const f = await filePromise as FileModel;
        fileList.push(f);
        initialFiles.push({
          name: f.name,
          extension: f.extension,
          size: f.size,
          id: null,
          class: null,
          url: null,
        });
      }
    }
    this.store.dispatch(FileActions.initialFiles({data: initialFiles}));
    this.store.dispatch(FileActions.loadFiles({params: fileList}));
  }

  onConfirm() {
    this.files$.pipe(
      map((files) => files.filter(value => value.class !== null)),
    ).subscribe(
      (files) => files.map(file => this.store.dispatch(FileActions.putFiles({data: file}))),
    ).unsubscribe();
  }
}
