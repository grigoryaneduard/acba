import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundPageComponent} from './core/containers';


export const routes: Routes = [
  { path: '', redirectTo: '/scanner', pathMatch: 'full' },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./scanner/scanner.module').then(m => m.ScannerModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {title: 'Not found'},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
