import { LoadingSpinnerComponent } from './image/loading-spinner/loading-spinner.component';
import { ShowLoadingDirective } from './image/show-loading.directive';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CubeComponent } from './web/cube/cube.component';
import { HomeComponent, LoginDialog } from './web/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  AdminComponent,
  addAward,
  showAward,
  Cropimg,
} from './web/admin/admin.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { AwardComponent, previewAward } from './web/award/award.component';

import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule } from 'ngx-image-cropper';

import { authInterceptorProviders } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    HomeComponent,
    HeaderComponent,
    ShowLoadingDirective,
    LoadingSpinnerComponent,
    FooterComponent,
    LoginDialog,
    AdminComponent,
    AwardComponent,
    addAward,
    showAward,
    Cropimg,
    previewAward
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxTypedJsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    DragDropModule,
    MatListModule,
    CKEditorModule,
    ImageCropperModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
