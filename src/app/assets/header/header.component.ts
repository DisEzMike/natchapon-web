import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  toTop() {
    let top = document.getElementById('top');
    top?.scrollIntoView({ behavior: 'smooth' });
  }

  home() {
    console.log(this.router.url);
    if (this.router.url.split('#')[0] == '/home') {
      let top = document.getElementById('top');
      top?.scrollIntoView({ behavior: 'smooth' });
      this.router.navigate(['/'])
    } else {
      window.open('/home', '_self')
    }
  }

  about() {
    this.router.navigateByUrl('#about')
  }
}
