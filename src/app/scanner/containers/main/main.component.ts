import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="row">
        <div class="container">
            <app-upload></app-upload>
        </div>
    </div>
  `,
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
