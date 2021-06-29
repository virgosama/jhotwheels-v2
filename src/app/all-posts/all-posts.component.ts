import {Component, OnInit} from '@angular/core';
import {BloggerService, DetailedPost} from "../blogger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  posts: DetailedPost[] = [];
  nextPageToken: string = '';

  constructor(private bloggerService: BloggerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(pageToken: string = ''): void {
    const regex = /(src=")((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/g;
    let imageArray = [];
    this.bloggerService.getPostListNew(pageToken).subscribe(resp => {
      console.log(resp);
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

  onClickDetails(postId: string): void {
    localStorage.setItem('postId', postId);
    this.router.navigate([]).then(e => {  window.open('/details', '_blank'); });
  }

  onClickLoadMore(): void {
    this.getPosts('pageToken=' + this.nextPageToken + '&');
  }

  onClickContactMe():void {
    const elmnt = document.getElementById("footer");
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }

}
