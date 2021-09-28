import {Component, OnInit} from '@angular/core';
import {BloggerService, DetailedPost} from '../blogger.service';
import {PhotoViewerDialogComponent} from "../photo-viewer-dialog/photo-viewer-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  isHomepage = false;
  posts: DetailedPost[] = [];
  nextPageToken = '';

  constructor(private bloggerService: BloggerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(pageToken: string = ''): void {
    const regex = /(src=")((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];
    this.bloggerService.getPostList(pageToken).subscribe(resp => {
      resp.items.forEach((item: any) => {
        let description = '';
        let descriptionArray: string[] = [];
        if (item.content.split('</p>').length > 1) {
          descriptionArray = item.content.split('</p>');
          description = descriptionArray[0].replace('<p>', '');
        } else if (item.content.split('<div>').length > 1) {
          descriptionArray = item.content.split('<div>');
          description = descriptionArray[0].replace('<div>', '');
        } else if (item.content.split('<br />').length > 1) {
          descriptionArray = item.content.split('<br />');
          description = descriptionArray[0].replace('<br />', '');
        }

        description = description.replace('&nbsp;', '');

        imageArray = item.content.match(regex);
        imageArray.forEach((element: any, index: number, array: any) => {
          array[index] = element.replace('src="', '');
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

      if (resp.nextPageToken) {
        this.nextPageToken = resp.nextPageToken;
      }

    });
  }

  // onClickDetails(postId: string): void {
  //   // localStorage.setItem('postId', postId);
  //   // this.router.navigate([]).then(e => {  window.open('/details', '_blank'); });
  //   this.router.navigate(['/details'], {state: {postId}});
  // }

  onClickLoadMore(): void {
    this.getPosts('pageToken=' + this.nextPageToken + '&');
  }

  onClickThumbnail(imageUrl: string, imageArray: string[]): void {
    console.log(imageArray);
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
