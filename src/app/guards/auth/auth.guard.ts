import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    // get the most recent value BehaviorSubject holds
    if (this.authService.user$.getValue()) {
      // can access targeted route
      return true;
    }

    /*
    User is not logged in as stored authInfo indicates,
    but in case the page has been reloaded, the stored value is lost,
    and in order to get real auth status we will perform the server call,
    (authService.getAuthInfo method will automatically update the BehaviorSubject value,
    and next time the protected route is accessed, no additional call will be made - until
    the next reloading).
    */

    return this.authService.user$.pipe(
      map((user) => {
        console.log('user', user);
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
