import { TokenStorageService } from '../../services/token-storage.service';
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
    this.router.navigate(['/']);
    let top = document.getElementById('top');
    top?.scrollIntoView({ behavior: 'smooth' });
  }

  logout() {
    this.Storage.signOut();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
