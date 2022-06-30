import { MatDialog } from '@angular/material/dialog';
import { MainService } from './../../services/main.service';
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
  constructor(
    private router: Router,
    private Storage: TokenStorageService,
    private dialog: MatDialog
  ) {}
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

  addAward() {
    this.dialog.open(addAward, {
      width: '80%',
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.awards, event.previousIndex, event.currentIndex);
    console.log(this.awards);
  }
}

@Component({
  selector: 'addAward',
  templateUrl: 'addAward.html',
  styleUrls: ['./award.scss'],
})
export class addAward {
  news_lastest_file?: FileList;
  news_lastest_file_url: string = '';

  constructor(
    private mainService: MainService,
    private Storage: TokenStorageService
  ) {}

  f1: any = {
    title: '',
    description: '',
    thumbnail: '',
  };

  upload(event: any) {
    const file: File | null = event.target.files.item(0);
    if (file) {
      this.mainService.awardUpload(file).subscribe(
        (data) => {
          if ((data.status = true)) {
            this.news_lastest_file_url =
              'https://api.mikenatchapon.me/uploads/' + data.filename;
            this.f1.thumbnail = data.filename;
            this.news_lastest_file = new FileList();
            console.log(this.news_lastest_file_url);
          } else {
            Swal.fire('Upload ไฟล์ไม่สำเร็จ', '', 'error');
          }
        },
        (err: any) => {
          console.error(err);
          if (err.error && err.error.message) {
            Swal.fire('ไม่สามารถ Upload ไฟล์ได้', err.error.message, 'error');
          } else {
            Swal.fire(
              'ไม่สามารถ Upload ไฟล์ได้',
              'รับเฉพาะ .png, .jpg .jpeg เท่านั้น',
              'error'
            );
          }
        }
      );
    }
  }

  onSummit() {
    this.mainService
      .awardCreate(this.f1.title, this.f1.description, this.f1.thumbnail)
      .subscribe((data) => {
        console.log(data);
      });
  }
}

@Component({
  selector: 'showAward',
  templateUrl: 'showAward.html',
  styleUrls: ['./award.scss'],
})
export class showAward {
  constructor(
    private mainService: MainService,
    private Storage: TokenStorageService
  ) {}

  f1: any = {
    title: '',
    description: '',
    thumbnail: '',
  };

  onSummit() {}
}
