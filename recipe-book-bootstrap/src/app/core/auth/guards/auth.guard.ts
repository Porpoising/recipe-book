import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

import * as fromApp from '../../../store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth', 'user').pipe(
      take(1),
      // map((appState) => {
      //   return appState.user;
      // }), uncomment if 'user' is not included in select method
      map((user) => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/signup']);
      })
    );
  }
}
