import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostModel, Result } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUserUrl: string;

  constructor(private http: HttpClient) {
    this.postUserUrl = environment.postUserUrl;
   }


  postsByUserId(userId: number): Observable<PostModel[]> {
    const observeble = new Observable<PostModel[]>(
      (observer) => {
        this.getPostsByUserId(userId).subscribe((result: Result) => {
          if (result && result.code === 0) {
            observer.next(result.data);
          } else {
            observer.error();
          }
        });
      }
    );

    return observeble;
  }

  private getPostsByUserId(userId: number): Observable<Result> {
    const url = this.postUserUrl + '/' + userId;
    return this.http.get<Result>(url);
  }

}
