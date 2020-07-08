import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  MainComponent,
  HistoryComponent,
} from './containers';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {title: 'Scanner'},
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {title: 'History'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule {
}
