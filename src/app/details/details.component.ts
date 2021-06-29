import {Component, OnInit} from '@angular/core';
import {BloggerService, DetailedPost} from "../blogger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  navigation: any;
  detailedPost: DetailedPost = {
    id: '',
    title: '',
    publishedDate: '',
    description: '',
    imageList: []
  };

  constructor(private bloggerService: BloggerService,
              private router: Router) {
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getDetailedPost(this.getPostId());
  }

  getPostId(): string {
    if (localStorage.getItem('postId')) {
      console.log(JSON.parse(localStorage.getItem('postId') || '{}'));
      return JSON.parse(localStorage.getItem('postId') || '{}');
      // return '6783225320059334877';
    } else {
      this.router.navigate(['/all-posts']);
      return '';
    }
  }

  getDetailedPost(postId: string): void {
    const regex = /(href=")((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];
    this.bloggerService.getDetailedPost(postId).subscribe(resp => {
      console.log(resp);
      let description = resp.content.split('</p>');
      if (description.length === 1) {
        description = resp.content.split('<div>');
        description = description[0];
      } else {
        description = description[0].replace('<p>', '');
      }

      imageArray = resp.content.match(regex);
      imageArray.forEach((element: any, index: number, array: any) => {
        array[index] = element.replace('href="', '');
      });

      this.detailedPost = {
        id: resp.id,
        title: resp.title,
        publishedDate: resp.published,
        description,
        imageList: imageArray
      };

      console.log(this.detailedPost);
    });
  }

  onClickContactMe(): void {
    const elmnt = document.getElementById("footer");
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }

}
