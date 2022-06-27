import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CubeComponent } from './web/cube/cube.component';
import { HomeComponent } from './web/home/home.component';

@NgModule({
  declarations: [AppComponent, CubeComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxTypedJsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
