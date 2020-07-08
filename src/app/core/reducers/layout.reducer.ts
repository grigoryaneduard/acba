import {createReducer, on} from '@ngrx/store';

import {LayoutActions} from '../actions';

export interface State {
  showSidenav: boolean;
  language: string;
}

export const layoutFeatureKey = 'layout';

const initialState: State = {
  showSidenav: false,
  language: 'en',
};

export const reducer = createReducer(
  initialState,
  // Even thought the `state` is unused, it helps infer the return type
  on(LayoutActions.closeSidenav, state => ({showSidenav: false, language: state.language})),
  on(LayoutActions.openSidenav, state => ({showSidenav: true, language: state.language})),
);

export const selectShowSidenav = (state: State) => state.showSidenav;
export const selectLanguage = (state: State) => state.language;
