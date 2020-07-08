import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {LayoutActions} from '../actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <app-sidenav [open]="showSidenav$ | async" (closeMenu)="closeSidenav()">
        <app-nav-item (navigate)="closeSidenav()" routerLink="/" icon="scanner" hint="Your helper scan">
          Scanner
        </app-nav-item>
        <app-nav-item (navigate)="closeSidenav()" routerLink="/scanner/history" icon="history" hint="History about scan">
          History
        </app-nav-item>
      </app-sidenav>
      <app-toolbar (openMenu)="openSidenav()">
        ACBA
      </app-toolbar>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  lang$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.selectShowSidenav));
    this.lang$ = this.store.pipe(select(fromRoot.selectLanguage));
  }

  closeSidenav() {
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }
}
