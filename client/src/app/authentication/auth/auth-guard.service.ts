import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    let obs = this.authService.isAuthenticated.pipe(take(1));
    obs.forEach((item)=>{
      if (!item) {
        this.router.navigateByUrl('/');
      }
    });
    return obs;

  }
}
