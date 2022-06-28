import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as $ from 'jquery';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { ['(window:scroll)']: 'documentClickEvent($event)' },
})
export class AppComponent implements OnInit {
  title = 'Angular';

  @ViewChild('loader') private loader!: ElementRef;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loader.nativeElement.remove();
    }, 1500);
  }
}
