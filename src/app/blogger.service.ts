import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  constructor(private httpClient: HttpClient) {
  }

  apiUrl = 'https://www.googleapis.com/blogger/v3/blogs/6780687593781336674';
  apiKey = 'AIzaSyD3gnYnXpYqm0nCMFbtTPlswNSKQwTvI9I';

  getPostList(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/posts?key=${this.apiKey}`);
  }

  // GET https://www.googleapis.com/blogger/v3/blogs/2399953?key=YOUR-API-KEY
  // GET https://www.googleapis.com/blogger/v3/blogs/2399953/posts/7706273476706534553?key=YOUR-API-KEY specific post
  // GET https://www.googleapis.com/blogger/v3/blogs/3213900/posts/search?q=documentation&key=YOUR-API-KEY search
  // GET https://www.googleapis.com/blogger/v3/blogs/2399953/posts/6069922188027612413/comments?key=YOUR-API-KEY get comments
  // GET https://www.googleapis.com/blogger/v3/blogs/2399953/posts/6069922188027612413/comments/9200761938824362519?key=YOUR-API-KEY get specific comment

}
