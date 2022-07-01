import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
})
export class CubeComponent implements OnInit {
  imageChangedEvent: any;
  croppedImage: any;
  ngOnInit(): void {}

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;

    const fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    );

    console.log(fileToReturn);
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
}
