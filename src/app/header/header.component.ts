import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  islogin = false;
  isAdmin = false;
  user: any;
  constructor(private router: Router, private Storage: TokenStorageService) {}

  ngOnInit(): void {
    if (!!this.Storage.getToken()) {
      this.islogin = true;
      this.user = this.Storage.getUser();
      if (this.user.admin == true) this.isAdmin = true;
    }
  }

  toTop() {
    let top = document.getElementById('top');
    top?.scrollIntoView({ behavior: 'smooth' });
  }

  home() {
    // console.log(this.router.url);
    if (this.router.url.split('#')[0] == '/home') {
      let top = document.getElementById('top');
      top?.scrollIntoView({ behavior: 'smooth' });
      this.router.navigate(['/']);
    } else {
      window.open('/home', '_self');
    }
  }

  about() {
    this.router.navigateByUrl('#about');
  }

  logout() {
    this.Storage.signOut();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
