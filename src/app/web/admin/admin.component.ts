import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MainService } from './../../services/main.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Award {
  id: number;
  title: string;
  description: string;
  image_id: number;
  image_url?: string;
  link: string;
  pin: number;
  delete: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit, OnInit {
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

  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    $('.top').hide();
    $('#aabout').hide();
    $('#aaward').hide();
    document.querySelector('.containerNav')?.classList.add('sticky');

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
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });
    dialogref.afterClosed().subscribe((result) => {
      this.mainService.removeImageNull().subscribe(() => {});
      this.loadData();
    });
  }

  showAward(data: Award) {
    let dialogref = this.dialog.open(showAward, {
      data: data,
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
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
      this.dataSource.data = this.awards;
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
    private dialogRef: MatDialogRef<addAward>,
    private dialog: MatDialog
  ) {}

  f1: any = {
    title: '',
    description: '',
    image_id: '',
  };

  upload(event: any) {
    const dialogE = this.dialog.open(Cropimg, {
      data: event,
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });

    dialogE.afterClosed().subscribe((result: File) => {
      if (result) {
        const file = result;
        if (file) {
          this.mainService.awardUpload(file).subscribe(
            (data) => {
              if ((data.status = true)) {
                this.news_lastest_file_url =
                  'https://api.mikenatchapon.com/uploads/' + data.filename;
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
                Swal.fire(
                  'ไม่สามารถ Upload ไฟล์ได้',
                  err.error.message,
                  'error'
                );
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
    });
  }

  upload1(event: any) {
    const dialogE = this.dialog.open(Cropimg, {
      data: event,
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });
    dialogE.afterClosed().subscribe((result: File) => {
      if (result) {
        const file = result;
        if (file) {
          this.mainService.awardUpload(file).subscribe(
            (data) => {
              if ((data.status = true)) {
                Swal.fire('Upload ไฟล์สำเร็จ', '', 'success').then(() => {
                  this.uploaded.push(
                    'https://api.mikenatchapon.com/uploads/' + data.filename
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
                Swal.fire(
                  'ไม่สามารถ Upload ไฟล์ได้',
                  err.error.message,
                  'error'
                );
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
    });
  }

  onSummit() {
    this.f1.image_id == '' ? (this.f1.image_id = null) : '';
    this.mainService
      .awardCreate(
        this.f1.title,
        this.f1.description,
        this.f1.link,
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
    private dialogRef: MatDialogRef<showAward>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Award
  ) {
    this.f1 = data;
    this.loadData();
  }

  f1: Award;
  logo_url = '';

  upload(event: any) {
    const dialogE = this.dialog.open(Cropimg, {
      data: event,
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });

    dialogE.afterClosed().subscribe((result: File) => {
      if (result) {
        const file = result;
        if (file) {
          this.mainService.awardUpload(file).subscribe(
            (data) => {
              if ((data.status = true)) {
                this.logo_url =
                  'https://api.mikenatchapon.com/uploads/' + data.filename;
                this.f1.image_id = data.id;
                Swal.fire('Upload ไฟล์สำเร็จ', '', 'success');
                // this.loadData();
              } else {
                Swal.fire('Upload ไฟล์ไม่สำเร็จ', '', 'error');
                this.loadData();
              }
            },
            (err: any) => {
              console.error(err);
              if (err.error && err.error.message) {
                Swal.fire(
                  'ไม่สามารถ Upload ไฟล์ได้',
                  err.error.message,
                  'error'
                );
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
    });
  }

  upload1(event: any) {
    const dialogE = this.dialog.open(Cropimg, {
      data: event,
            panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });

    dialogE.afterClosed().subscribe((result: File) => {
      if (result) {
        const file = result;
        if (file) {
          this.mainService.awardUpload(file).subscribe(
            (data) => {
              if ((data.status = true)) {
                Swal.fire('Upload ไฟล์สำเร็จ', '', 'success').then(() => {
                  this.uploaded.push(
                    'https://api.mikenatchapon.com/uploads/' + data.filename
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
                Swal.fire(
                  'ไม่สามารถ Upload ไฟล์ได้',
                  err.error.message,
                  'error'
                );
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
    });
  }

  onSummit() {
    this.mainService
      .awardUpdate(
        this.f1.id,
        this.f1.title,
        this.f1.description,
        this.f1.link,
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
    this.mainService.getAwards(this.f1.id).subscribe((data: any) => {
      this.f1 = data.data;
      this.mainService.getAwardimg(data.data.id).subscribe((resp) => {
        if (resp.status == true) {
          this.uploaded = new Array();
          this.uploaded_id = new Array();
          let data_obj = resp.data;
          data_obj.forEach((element: any) => {
            this.uploaded.push(
              'https://api.mikenatchapon.com/uploads/' + element.thumbnail
            );
            this.uploaded_id.push(element.id);
          });
        }
      });
    });

    this.mainService.getAwardLogo(this.f1.id).subscribe((data) => {
      if (data.status == true && !!data.data) {
        this.logo_url =
          'https://api.mikenatchapon.com/uploads/' + data.data.thumbnail;
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

  awardPin() {
    this.mainService.awardPin(this.f1.id).subscribe((data) => {
      if (data.status == true) {
        Swal.fire('Pin สำเร็จ', '', 'success').then(() => {
          this.loadData();
        });
      } else {
        Swal.fire('Pin ไม่สำเร็จ', data.message, 'error');
      }
    });
  }

  awardUnpin() {
    this.mainService.awardUnpin(this.f1.id).subscribe((data) => {
      if (data.status == true) {
        Swal.fire('Unpin สำเร็จ', '', 'success').then(() => {
          this.loadData();
        });
      } else {
        Swal.fire('Unpin ไม่สำเร็จ', data.message, 'error');
      }
    });
  }
}

@Component({
  selector: 'cropimg',
  templateUrl: 'cropimg.html',
  styleUrls: ['./award.scss'],
})
export class Cropimg {
  imageChangedEvent: any;
  croppedImage: any;
  fileCrop: any;

  constructor(
    private dialogRef: MatDialogRef<Cropimg>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {
    this.imageChangedEvent = data;
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    this.fileCrop = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    );
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  base64ToFile(data: any, filename: string) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  wantFullsize() {
    const file: File | null = this.imageChangedEvent.target.files.item(0);
    this.dialogRef.close(file);
  }

  onSummit() {
    this.dialogRef.close(this.fileCrop);
  }
}
