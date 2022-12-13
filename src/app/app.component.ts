import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as AOS from 'aos'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // host: { ['(window:scroll)']: 'documentClickEvent($event)' },
})
export class AppComponent implements OnInit {
  title = 'Angular';

  @ViewChild('loader') private loader!: ElementRef;

  constructor() {}

  ngOnInit() {
    AOS.init()
    setTimeout(() => {
      this.loader.nativeElement.remove();
    }, 1500);
  }

  toTop() {
    let top = document.getElementById('top');
    top?.scrollIntoView({ behavior: 'smooth' });
  }
}
