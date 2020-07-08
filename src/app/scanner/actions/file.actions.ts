import {props, createAction} from '@ngrx/store';

export const loadFiles = createAction('[File] Load Files', props<{ params: any }>());
export const filesSuccess = createAction('[File] Files Success', props<{ files: any }>());
export const filesFailure = createAction('[File] Files Failure', props<{ error: any }>());

export const initialFiles = createAction('[File] initial Files', props<{ data: any }>());
export const putFiles = createAction('[File] File Update', props<{ data: any }>());
export const deleteFile = createAction('[File] File Delete', props<{ name: any }>());
export const editFile = createAction('[File] File Edit', props<{ file: any }>());
export const fileUpdateFailure = createAction('[File] File Update Failure', props<{ error: any }>());
