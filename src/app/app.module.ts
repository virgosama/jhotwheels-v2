import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { AllPostsComponent } from './all-posts/all-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MostPopularComponent,
    AllPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
