import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParcelModule } from 'single-spa-angular/parcel';
import { mountRootParcel } from 'single-spa';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ParcelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  mountRootParcel = mountRootParcel;
  // todo react config
}
