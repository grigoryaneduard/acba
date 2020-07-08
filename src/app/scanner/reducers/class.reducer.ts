import {createReducer, on} from '@ngrx/store';
import {ClassActions} from '../actions';

export const classFeatureKey = 'classes';

export interface State {
  loading: boolean;
  error: string;
  data: any[];
}

const initialState: State = {
  loading: false,
  error: '',
  data: [],
};

export const reducer = createReducer(
  initialState,
  on(ClassActions.loadClasses, state => ({...state, loading: true, error: ''})),
  on(ClassActions.classesSuccess, (state, {classes}) => ({loading: false, error: '', data: [...state.data, ...classes]})),
  on(ClassActions.classesFailure, ((state, {error}) => ({...state, loading: false, error: error.message})))
);

export const getLoading = (state: State) => state.loading;
export const getClasses = (state: State) => state.data;
export const getError = (state: State) => state.error;
