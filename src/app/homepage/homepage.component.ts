import {Component, OnInit} from '@angular/core';
import {BloggerService} from '../blogger.service';

export interface DetailedPost {
  id: string;
  title: string;
  publishedDate: string;
  description: string;
  imageList: string[];
}

export interface Images {
  url: string;
}


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  posts: DetailedPost[] = [];

  constructor(private bloggerService: BloggerService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.bloggerService.getPostList().subscribe(resp => {
      resp.items.forEach((item: any) => {
        let description = item.content.split('</p>');
        if (description.length === 1) {
          description = item.content.split('<div>');
          description = description[0];
        } else {
          description = description[0].replace('<p>', '');
        }

        const imageArray: string[] = [];
        const imageSplit = item.content.split('https://1.bp.blogspot.com/');
        imageSplit.forEach((e: any) => {
          if (e.includes('.HEIC') && e.includes('/s3024')) {
            const heicString = 'https://1.bp.blogspot.com/' + e.substring(0, e.indexOf('.HEIC')) + '.HEIC';
            console.log(heicString);
            imageArray.push(heicString);
          } else if (e.includes('.PNG') && e.includes('/s3024')) {
            const pngString = 'https://1.bp.blogspot.com/' + e.substring(0, e.indexOf('.PNG')) + '.PNG';
            console.log(pngString);
            imageArray.push(pngString);
          } else if (e.includes('.jpg') && e.includes('/s3024')) {
            const jpgString = 'https://1.bp.blogspot.com/' + e.substring(0, e.indexOf('.jpg')) + '.jpg';
            console.log(jpgString);
            imageArray.push(jpgString);
          }
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
      console.log(this.posts);
    });
  }
}
