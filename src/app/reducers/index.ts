import {
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  Action,
  ActionReducerMap,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

import * as fromLayout from '../core/reducers/layout.reducer';
import {InjectionToken} from '@angular/core';

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShowSidenav = createSelector(
  selectLayoutState,
  fromLayout.selectShowSidenav
);

export const selectLanguage = createSelector(
  selectLayoutState,
  fromLayout.selectLanguage
);
