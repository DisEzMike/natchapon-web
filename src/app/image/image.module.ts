import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowLoadingDirective } from './show-loading.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    ShowLoadingDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowLoadingDirective
  ]
})
export class ImageModule { }
