import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user = window['user'];

  constructor(private http: Http) { }

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signup(student: Student) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:1337/api/auth/signup', student, { headers: headers })
      .map(res => res.json());
  }

  signin(credentials: any) {  
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:1337/api/auth/signin', credentials, { headers: headers })
    .map(res => this.user = res.json())
  }

}
