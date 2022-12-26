import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../services/auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (
  email: string,
  localId: string,
  idToken: string,
  expiresIn: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.authSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate: expirationDate,
    redirect: true,
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(AuthActions.authFail({ errorMessage: errorMessage }));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authFail({ errorMessage: errorMessage }));
};

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: any) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com' +
              '/v1/accounts:signUp?' +
              'key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.email,
              password: signupAction.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((responseData) => {
              this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
            }),
            map((responseData) => {
              return handleAuth(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                responseData.expiresIn
              );
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: any) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com' +
              '/v1/accounts:signInWithPassword?' +
              'key=' +
              environment.firebaseAPIKey,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((responseData) => {
              this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
            }),
            map((responseData) => {
              return handleAuth(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                responseData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap((authSuccessAction: any) => {
          if (authSuccessAction.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'NO_LOGGED_USER_YET' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          // this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });

          // this.autoLogOut(expirationDuration);
        }
        return { type: 'NO_LOGGED_USER_YET' };
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/signup']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
