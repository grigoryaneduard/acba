import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {ApiService} from '../api/services/api.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ClassActions} from '../actions';

@Injectable()
export class ClassEffects {

  loadClasses$ = createEffect(
    () => this.actions$.pipe(
      ofType(ClassActions.loadClasses),
      switchMap(() =>
        this.api.getFileClasses().pipe(
          map((list) => ClassActions.classesSuccess({classes: list === null ? [] : list})),
          catchError(error => of(ClassActions.classesFailure({error})))
        )
      )
    ));

  constructor(
    private actions$: Actions,
    private api: ApiService,
  ) {
  }

}
