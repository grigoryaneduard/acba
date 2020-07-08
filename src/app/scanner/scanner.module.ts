import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainComponent, HistoryComponent} from './containers';
import {MaterialModule} from '../material';
import {ScannerRoutingModule} from './scanner-routing.module';
import {SharedModule} from '../shared';
import {UploadComponent, UploadListComponent} from './components';
import {ApiModule} from './api/api.module';
import {NgxFileDropModule} from 'ngx-file-drop';
import {EffectsModule} from '@ngrx/effects';
import {ClassEffects, FileEffects} from './effects';
import * as fromScanner from './reducers';
import {StoreModule} from '@ngrx/store';
import {ReviewDialog} from './dialogs';

export const COMPONENTS = [
  UploadComponent,
  UploadListComponent,
];

export const CONTAINERS = [
  MainComponent,
  HistoryComponent,
];

export const DIALOGS = [
  ReviewDialog,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ScannerRoutingModule,
    ApiModule,
    SharedModule,
    NgxFileDropModule,
    StoreModule.forFeature(fromScanner.scannerFeatureKey, fromScanner.reducers),
    EffectsModule.forFeature([FileEffects, ClassEffects]),
  ],
  declarations: [CONTAINERS, COMPONENTS, DIALOGS],
})
export class ScannerModule {
}
