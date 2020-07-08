import {props, createAction} from '@ngrx/store';

export const loadClasses = createAction('[Class] Load Classes');
export const classesSuccess = createAction('[Class] Classes Success', props<{ classes: any }>());
export const classesFailure = createAction('[Class] Classes Failure', props<{ error: any }>());
