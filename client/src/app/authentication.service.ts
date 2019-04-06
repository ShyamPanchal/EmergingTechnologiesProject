import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { SessionService } from './authentication/auth/session.service';
import { ReplaySubject, BehaviorSubject, throwError } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalVariable } from './globals';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user = window['user'];

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: Http, private session: SessionService) { }

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signOut() {
    this.purgeAuth();
    let headers = new Headers();
    return this.http.get('http://localhost:1337/api/auth/signout', { headers: headers }).subscribe;
  }

  signup(user: User) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:1337/api/auth/signup', user, { headers: headers })
      .map(res => res.json());
  }  

  signin(credentials: any) {  
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:1337/api/auth/signin', credentials, { headers: headers })
    .map( res => {
      this.setAuth(res.json() as User);
      return this.user;
    })
  }

  getProfile() {  
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:1337/api/auth/get/'+this.session.getUserId(), { headers: headers })
    .subscribe(res => {
        let user = res.json()[0] as User;
        if (user._id) {
          this.setAuth(user);          
        } else {
          this.purgeAuth();
        }
      }, 
      err=>{
        this.purgeAuth();
        console.log('console error ' + err);
    });   
    
  }

  private purgeAuth() {
    this.session.destroyUserId();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  populate() {
    if (this.session.getUserId()) {
      this.getProfile();
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
      this.user = user;
      this.session.saveUserId(user._id);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
  }

}
