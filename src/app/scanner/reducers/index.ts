import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromFile from './file.reducer';
import * as fromClass from './class.reducer';
import {classFeatureKey} from './class.reducer';
import {fileFeatureKey} from './file.reducer';

export const scannerFeatureKey = 'scanner';

export interface ScannerState {
  [fromFile.fileFeatureKey]: fromFile.State;
  [fromClass.classFeatureKey]: fromClass.State;
}

export interface State extends fromRoot.State {
  [scannerFeatureKey]: ScannerState;
}

export function reducers(state: ScannerState | undefined, action: Action) {
  return combineReducers({
    [fromFile.fileFeatureKey]: fromFile.reducer,
    [fromClass.classFeatureKey]: fromClass.reducer,
  })(state, action);
}

export const selectScannerState = createFeatureSelector<State, ScannerState>(scannerFeatureKey);
export const selectClassState = createSelector(selectScannerState, state => state[classFeatureKey]);
export const selectClasses = createSelector(selectClassState, fromClass.getClasses);
export const selectClassesError = createSelector(selectClassState, fromClass.getError);
export const selectClassLoading = createSelector(selectClassState, fromClass.getLoading);
export const selectFileEntitiesState = createSelector(selectScannerState, state => state[fileFeatureKey]);

export const {
  selectIds: selectFileIds,
  selectEntities: selectFileEntities,
  selectAll: selectAllFiles,
  selectTotal: selectTotalFiles,
} = fromFile.adapter.getSelectors(selectFileEntitiesState);

export const selectFilesError = createSelector(selectFileEntitiesState, fromFile.getError);
export const selectFileLoading = createSelector(selectFileEntitiesState, fromFile.getLoading);
