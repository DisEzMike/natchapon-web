import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MainService } from './../../services/main.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

export interface Award {
  id: number;
  title: string;
  description: string;
  image_id: number;
  pin: string;
  delete: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private router: Router,
    private Storage: TokenStorageService,
    private dialog: MatDialog
  ) {}
  page = 0;
  islogin = false;
  user: any;
  awards = new Array();
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
    this.loadData();
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
    let dialogref = this.dialog.open(addAward, {
      width: '80%',
    });
    dialogref.afterClosed().subscribe((result) => {
      this.mainService.removeImageNull().subscribe(() => {});
      this.loadData();
    });
  }

  showAward(data: Award) {
    let dialogref = this.dialog.open(showAward, {
      width: '80%',
      data: data,
    });
    dialogref.afterClosed().subscribe((result) => {
      this.mainService.removeImageNull().subscribe(() => {});
      this.loadData();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.awards, event.previousIndex, event.currentIndex);
  }

  loadData() {
    this.awards = new Array();
    this.mainService.getAwards().subscribe((data) => {
      this.awards = data.data;
    });
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
  uploaded = new Array();
  uploaded_id = new Array();
  logo_url = '';

  constructor(
    private mainService: MainService,
    private dialogRef: MatDialogRef<addAward>
  ) {}

  f1: any = {
    title: '',
    description: '',
    image_id: '',
  };

  upload(event: any) {
    const file: File | null = event.target.files.item(0);
    if (file) {
      this.mainService.awardUpload(file).subscribe(
        (data) => {
          if ((data.status = true)) {
            this.news_lastest_file_url =
              'https://api.mikenatchapon.me/uploads/' + data.filename;
            this.f1.image_id = data.id;
            this.logo_url = this.news_lastest_file_url;
            Swal.fire('Upload ไฟล์สำเร็จ', '', 'success');
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

  upload1(event: any) {
    const file: File | null = event.target.files.item(0);
    if (file) {
      this.mainService.awardUpload(file).subscribe(
        (data) => {
          if ((data.status = true)) {
            Swal.fire('Upload ไฟล์สำเร็จ', '', 'success').then(() => {
              this.uploaded.push(
                'https://api.mikenatchapon.me/uploads/' + data.filename
              );
              this.uploaded_id.push(data.id);
            });
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
    // console.log(this.f1);
    this.f1.image_id == '' ? (this.f1.image_id = null) : '';
    this.mainService
      .awardCreate(
        this.f1.title,
        this.f1.description,
        this.f1.image_id,
        this.uploaded_id
      )
      .subscribe((data) => {
        if (data.status == true) {
          Swal.fire('เพิ่มผลงานและรางวัลสำเร็จ', '', 'success').then(() => {
            this.dialogRef.close();
          });
        } else {
          Swal.fire('เพิ่มผลงานและรางวัลไม่สำเร็จ', '', 'error');
        }
      });
  }

  removeImage(index: number) {
    this.mainService.removeImage(this.uploaded_id[index]).subscribe((data) => {
      if (data.status == true) {
        this.uploaded.splice(index, 1);
        this.uploaded_id.splice(index, 1);
      }
    });
  }
}

@Component({
  selector: 'showAward',
  templateUrl: 'showAward.html',
  styleUrls: ['./award.scss'],
})
export class showAward {
  news_lastest_file?: FileList;
  news_lastest_file_url: string = '';
  uploaded = new Array();
  uploaded_id = new Array();

  constructor(
    private mainService: MainService,
    private dialogRef: MatDialogRef<addAward>,
    @Inject(MAT_DIALOG_DATA) public data: Award
  ) {
    this.f1 = data;
    this.loadData();
  }

  f1: Award;
  logo_url = '';

  upload(event: any) {
    const file: File | null = event.target.files.item(0);
    if (file) {
      this.mainService.awardUpload(file).subscribe(
        (data) => {
          if ((data.status = true)) {
            this.news_lastest_file_url =
              'https://api.mikenatchapon.me/uploads/' + data.filename;
            this.f1.image_id = data.id;
            Swal.fire('Upload ไฟล์สำเร็จ', '', 'success');
            this.loadData();
          } else {
            Swal.fire('Upload ไฟล์ไม่สำเร็จ', '', 'error');
            this.loadData();
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

  upload1(event: any) {
    const file: File | null = event.target.files.item(0);
    if (file) {
      this.mainService.awardUpload(file).subscribe(
        (data) => {
          if ((data.status = true)) {
            Swal.fire('Upload ไฟล์สำเร็จ', '', 'success').then(() => {
              this.uploaded.push(
                'https://api.mikenatchapon.me/uploads/' + data.filename
              );
              this.uploaded_id.push(data.id);
            });
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
      .awardUpdate(
        this.f1.id,
        this.f1.title,
        this.f1.description,
        this.f1.image_id,
        this.uploaded_id
      )
      .subscribe((data) => {
        if (data.status == true) {
          Swal.fire('แก้ไขผลงานและรางวัลสำเร็จ', '', 'success').then(() => {
            this.dialogRef.close();
          });
        } else {
          Swal.fire('แก้ไขผลงานและรางวัลไม่สำเร็จ', '', 'error');
        }
      });
  }

  removeImage(index: number) {
    this.mainService.removeImage(this.uploaded_id[index]).subscribe((data) => {
      if (data.status == true) {
        this.uploaded.splice(index, 1);
        this.uploaded_id.splice(index, 1);

        this.loadData();
      }
    });
  }

  loadData() {
    this.mainService.getAwardimg(this.f1.id).subscribe((data) => {
      if (data.status == true) {
        this.uploaded = new Array();
        this.uploaded_id = new Array();
        let data_obj = data.data;
        data_obj.forEach((element: any) => {
          this.uploaded.push(
            'https://api.mikenatchapon.me/uploads/' + element.thumbnail
          );
          this.uploaded_id.push(element.id);
        });
      }
    });

    this.mainService.getAwardLogo(this.f1.id).subscribe((data) => {
      if (data.status == true) {
        this.logo_url =
          'https://api.mikenatchapon.me/uploads/' + data.data.thumbnail;
      } else {
        this.logo_url = '';
      }
    });
  }

  deleteAward() {
    Swal.fire({
      title: 'คุณต้องการลบผลงานนี้หรือไม่?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.mainService.awardRemove(this.f1.id).subscribe((data) => {
          if (data.status == true) {
            Swal.fire('ลบผลงานสำเร็จ', '', 'success').then(() => {
              this.dialogRef.close();
            });
          } else {
            Swal.fire('ลบผลงานไม่สำเร็จ', '', 'error');
          }
        });
      }
    });
  }
}
