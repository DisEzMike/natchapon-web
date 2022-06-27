import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular';

  @ViewChild('loader') private loader!: ElementRef;

  constructor() {}

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loader.nativeElement.remove();
    }, 1500);
  }
}
