import {Component, OnInit} from '@angular/core';
import {BloggerService, DetailedPost, FeaturedPost} from '../blogger.service';
import {MatDialog} from "@angular/material/dialog";
import {PhotoViewerDialogComponent} from "../photo-viewer-dialog/photo-viewer-dialog.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  isHomepage = true;
  posts: DetailedPost[] = [];

  constructor(private bloggerService: BloggerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    const regex = /(href=")((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];

    this.bloggerService.getPostList('').subscribe(resp => {
      resp.items.forEach((item: any) => {
        let description = item.content.split('</p>');
        if (description.length === 1) {
          description = item.content.split('<div>');
          description = description[0];
        } else {
          description = description[0].replace('<p>', '');
        }

        imageArray = item.content.match(regex);
        imageArray.forEach((element: any, index: number, array: any) => {
          array[index] = element.replace('href="', '');
        });

        const detailedPost = {
          id: item.id,
          title: item.title,
          publishedDate: item.published,
          description,
          imageList: imageArray
        };
        this.posts.push(detailedPost);
      });
    });
  }

  onClickThumbnail(imageUrl: string, imageArray: string[]): void {
    const dialogConfig = {
      width: '100%',
      height: '100%',
      data: {
        imageUrl,
        imageArray
      },
      backdropClass: 'dialog-backdrop',
      panelClass: 'photo-viewer-dialog',
    };
    this.dialog.open(PhotoViewerDialogComponent, dialogConfig);
  }
}
