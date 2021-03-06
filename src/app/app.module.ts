import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { DetailsComponent } from './details/details.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PhotoViewerDialogComponent} from "./photo-viewer-dialog/photo-viewer-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MostPopularComponent,
    AllPostsComponent,
    FooterComponent,
    HeaderMenuComponent,
    DetailsComponent,
    PhotoViewerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
