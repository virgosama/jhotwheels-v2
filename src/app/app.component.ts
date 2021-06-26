import {Component, OnInit} from '@angular/core';
import {BloggerService} from './blogger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jhotwheels-v2';

  constructor(private bloggerService: BloggerService) {
  }

  ngOnInit(): void {
    this.bloggerService.getBlogPost().subscribe(resp => {
      console.log(resp);
    });
  }
}
