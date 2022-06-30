import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private Storage: TokenStorageService) {}
  page = 0;
  islogin = false;
  user: any;
  awards = ['แข่งขันศิลปะหัตถกรรม ครั้งที่ 90', 'test2', 'test3'];
  ngOnInit(): void {
    if (!!!this.Storage.getToken()) {
      Swal.fire('กรุณาเข้าสู่ระบบ', '', 'info').then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.user = this.Storage.getUser();
      if (this.user.admin != true) {
        Swal.fire('คุณไม่มีสิทธิ์เข้าหน้านี้', '', 'error').then(() => {
          this.router.navigate(['/home']);
        });
      }
    }
    document.querySelector('.containerNav')?.classList.add('sticky');
    const page = window.localStorage.getItem('page');
    if (page) {
      this.page = parseInt(page, 10);
    }
  }

  selectPage(page: number) {
    this.page = page;
    window.localStorage.setItem('page', page.toString());
  }

  addAward() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.awards, event.previousIndex, event.currentIndex);
    console.log(this.awards);
  }
}
