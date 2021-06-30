import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MostPopularComponent} from './most-popular/most-popular.component';
import {AllPostsComponent} from './all-posts/all-posts.component';
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'all-posts', component: AllPostsComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'most-popular', component: MostPopularComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
