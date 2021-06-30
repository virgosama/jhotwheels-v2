import {Component, OnInit} from '@angular/core';
import {BloggerService, DetailedPost} from "../blogger.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDetailedPost(this.getPostId());
  }

  getPostId(): string {
    return this.router.snapshot.params['id'];
  }

  getDetailedPost(postId: string): void {
    const regex = /(href=")((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];
    this.bloggerService.getDetailedPost(postId).subscribe(resp => {
      let description = '';
      let descriptionArray: string[] = [];
      if (resp.content.split('</p>').length > 1) {
        descriptionArray = resp.content.split('</p>');
        description = descriptionArray[0].replace('<p>', '');
      } else if (resp.content.split('<div>').length > 1) {
        descriptionArray = resp.content.split('<div>');
        description = descriptionArray[0].replace('<div>', '');
      } else if (resp.content.split('<br />').length > 1) {
        descriptionArray = resp.content.split('<br />');
        description = descriptionArray[0].replace('<br />', '');
      }

      description = description.replace('&nbsp;', '');

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
    });
  }

  onClickContactMe(): void {
    const elmnt = document.getElementById("footer");
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }

}
