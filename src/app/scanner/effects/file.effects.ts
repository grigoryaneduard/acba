import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '../api/services/api.service';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {FileActions} from '../actions';
import {of} from 'rxjs';

@Injectable()
export class FileEffects {

  loadFiles$ = createEffect(
    () => this.actions$.pipe(
      ofType(FileActions.loadFiles),
      switchMap(({params}) =>
        this.api.upload({body: {name: '', files: params}}).pipe(
          map((list) => FileActions.filesSuccess({files: list})),
          catchError(error => of(FileActions.filesFailure({error})))
        )
      )
    ));

  updateFile$ = createEffect(
    () => this.actions$.pipe(
      ofType(FileActions.putFiles),
      concatMap(({data}) =>
        this.api.updateFile({id: data.id, body: data}).pipe(
          map(() => FileActions.deleteFile({name: data.name})),
          /* call another error action */
          catchError(error => of(FileActions.filesFailure({error})))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private api: ApiService,
  ) {
  }
}
