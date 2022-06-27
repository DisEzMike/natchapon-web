import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular';

  @ViewChild('loader') private loader!: ElementRef;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loader.nativeElement.remove();
    }, 1500)
  }
}
