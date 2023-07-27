import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result, User } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string;


  constructor(private http: HttpClient) { 
    this.userUrl = environment.usersUrl;
  }

  allUsers(): Observable<User[]>{
    const observeble = new Observable<User[]>(
      (observer) => {
        this.getUsers().subscribe((result: Result) => {
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


  private getUsers(): Observable<Result>{
    const url = this.userUrl;
    return this.http.get<Result>(url);
  }

}
