import {createReducer, on} from '@ngrx/store';
import {FileActions} from '../actions';
import {EntityAdapter, createEntityAdapter, EntityState} from '@ngrx/entity';
import {File} from '../api/models/file';

export const fileFeatureKey = 'files';

export interface State extends EntityState<File> {
  selectedFileId: string | null;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<File> = createEntityAdapter<File>({
  selectId: (book: File) => book.name,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedFileId: null,
  loading: false,
  error: '',
});

export const reducer = createReducer(
  initialState,
  on(FileActions.initialFiles, (state, {data}) =>  adapter.addMany(data, {...state, loading: false, error: ''})),
  on(FileActions.loadFiles, state => ({...state, loading: true, error: ''})),
  on(FileActions.filesSuccess, (state, {files}) => adapter.upsertMany(files, {...state, loading: false, error: ''})),
  on(FileActions.editFile, ((state, {file}) => adapter.upsertOne(file, {...state, loading: false, error: ''}))),
  on(FileActions.deleteFile, ((state, {name}) => adapter.removeOne(name, {...state, loading: false, error: 'File Updated'}))),
  on(FileActions.filesFailure, (state, {error}) => ({...state, loading: false, error: error.message}))
);

export const getSelectedUserId = (state: State) => state.selectedFileId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
