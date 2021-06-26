import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  constructor(private httpClient: HttpClient) {
  }

  getBlogPost(): Observable<any> {
    return this.httpClient.get<any>(
      `https://www.googleapis.com/blogger/v3/blogs/6780687593781336674/posts?key=AIzaSyD3gnYnXpYqm0nCMFbtTPlswNSKQwTvI9I`);
  }
}
