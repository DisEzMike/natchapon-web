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
import {
  HomeComponent,
  LoginDialog,
  previewAward,
} from './web/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {
  AdminComponent,
  addAward,
  showAward,
  Cropimg,
} from './web/admin/admin.component';

import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CKEditorModule } from 'ckeditor4-angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { CachingInterceptor } from './helpers/caching.interceptor';
import { PrivacyComponent } from './shared/privacy/privacy.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// material modules
import { MaterialModule } from './material.module';
import { ProjectComponent } from './web/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ShowLoadingDirective,
    LoadingSpinnerComponent,
    FooterComponent,
    LoginDialog,
    AdminComponent,
    addAward,
    showAward,
    Cropimg,
    previewAward,
    PrivacyComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxTypedJsModule,
    FormsModule,
    DragDropModule,
    ImageCropperModule,
    CKEditorModule,
    MaterialModule,

    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'natchapon-app'
    ),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
