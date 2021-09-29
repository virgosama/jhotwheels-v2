import { Component, OnInit } from '@angular/core';
import {BloggerService, DetailedPost} from "../blogger.service";
import {ActivatedRoute} from "@angular/router";
import {PhotoViewerDialogComponent} from "../photo-viewer-dialog/photo-viewer-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  isHomepage = false;
  postsId = [
    '1259528793745254486',
    '6401671854284935159',
    '5257206969965613957',
    '5579040236832805068',
    '17591722239979435',
    '9034176381209225066',
    '93550323837631032',
    '3295268274019853603',
    // '2255102703207232300',
    '2992066848125768362'
  ];
  response: any;
  posts: DetailedPost[] = [];

  constructor(private bloggerService: BloggerService,
              private router: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPopularPosts();
  }

  getPopularPosts(): void {
    const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];
    let description = '';
    let descriptionArray: string[] = [];
    for(let i = 0; i < this.postsId.length; i++) {
      description = '';
      descriptionArray = [];
      this.bloggerService.getDetailedPost(this.postsId[i]).subscribe(resp => {
        this.response = resp;
        console.log(resp);
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
          array[index] = element.replace('src="', '');
        });

        const detailedPost = {
          id: resp.id,
          title: resp.title,
          publishedDate: resp.published,
          description,
          imageList: imageArray
        };
        this.posts.push(detailedPost);

      });
    }
  }

  onClickThumbnail(imageUrl: string, imageArray: string[]): void {
    const dialogConfig = {
      width: '100%',
      height: '100%',
      data:
        {
          imageUrl,
          imageArray
        },
      backdropClass: 'dialog-backdrop',
      panelClass: 'photo-viewer-dialog',
    };
    this.dialog.open(PhotoViewerDialogComponent, dialogConfig);
  }
}
