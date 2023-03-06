import { DragDropModule } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetroDatepickerComponent } from './global-modules/retro-datepicker/retro-datepicker.component';
import { SettingsModalComponent } from './global-modules/settings-modal/settings-modal.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AlertModalComponent } from './global-modules/alert-modal/alert-modal.component';


registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RetroDatepickerComponent,
    SettingsModalComponent,
    LoginComponent,
    AlertModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
