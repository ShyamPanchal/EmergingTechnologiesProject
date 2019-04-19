import { Injectable } from '@angular/core';


@Injectable()
export class SessionService {

  getUserId(): string {
    return window.localStorage['userID'];
  }

  saveUserId(id: string) {
    window.localStorage['userID'] = id;
  }

  destroyUserId() {
    window.localStorage.removeItem('userID');
  }

}
