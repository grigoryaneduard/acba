import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  template: `
    <div class="row">
        <div class="container">
            <h1>History</h1>
        </div>
    </div>
  `,
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
