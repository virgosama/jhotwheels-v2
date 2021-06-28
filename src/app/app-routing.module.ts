import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {MostPopularComponent} from './most-popular/most-popular.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'most-popular', component: MostPopularComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
