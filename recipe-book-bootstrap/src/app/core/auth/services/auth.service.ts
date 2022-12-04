// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

// import { User } from '../user.model';
// import { environment } from 'src/environments/environment';
import * as fromApp from '../../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  private tokenExpirationTimer: any;
  // user = new BehaviorSubject<User>(null);

  // errorMessage: string = 'An unknown error occured!';
  // errorType: number = null;

  // signUpLink: string =
  //   'https://identitytoolkit.googleapis.com' +
  //   '/v1/accounts:signUp?' +
  //   'key=' +
  //   environment.firebaseAPIKey;

  // signInLink: string =
  //   'https://identitytoolkit.googleapis.com' +
  //   '/v1/accounts:signInWithPassword?' +
  //   'key=' +
  //   environment.firebaseAPIKey;

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // private errorHandler(errorResponse: HttpErrorResponse, isLoginMode: boolean) {
  //   console.log(errorResponse);
  //   if (!errorResponse.error || !errorResponse.error.error) {
  //     throw {
  //       errorMessage: this.errorMessage,
  //       errorType: this.errorType,
  //     };
  //   }

  //   switch (!isLoginMode) {
  //     case true:
  //       switch (errorResponse.error.error.message) {
  //         case 'EMAIL_EXISTS':
  //           this.errorMessage = 'Account with that email already exists.';
  //           this.errorType = 0;
  //           break;

  //         case 'WEAK_PASSWORD : Password should be at least 6 characters':
  //           this.errorMessage =
  //             'Your password must contain at least 6 characters.';
  //           this.errorType = 1;
  //           break;

  //         case 'OPERATION_NOT_ALLOWED':
  //           this.errorMessage = 'Password sign-up is disabled.';
  //           this.errorType = 0;
  //           break;
  //       }
  //       break;

  //     case false:
  //       switch (errorResponse.error.error.message) {
  //         case 'INVALID_PASSWORD':
  //           this.errorMessage = 'Invalid password.';
  //           this.errorType = 1;
  //           break;

  //         case 'EMAIL_NOT_FOUND':
  //           this.errorMessage = 'Account with that email does not exist.';
  //           this.errorType = 0;
  //           break;

  //         case 'USER_DISABLED':
  //           this.errorMessage =
  //             'This account has been disabled by administrator.';
  //           this.errorType = 0;
  //           break;

  //         case 'TOO_MANY_ATTEMPTS_TRY_LATER : ' +
  //           'Access to this account has been temporarily disabled ' +
  //           'due to many failed login attempts. You can immediately restore it ' +
  //           'by resetting your password or you can try again later.':
  //           this.errorMessage =
  //             'Access to this account has been temporarily disabled ' +
  //             'due to many failed login attempts. You can immediately restore it ' +
  //             'by resetting your password or you can try again later.';
  //           this.errorType = 0;
  //           break;
  //       }
  //       break;
  //   }
  //   throw { errorMessage: this.errorMessage, errorType: this.errorType };
  // }

  // private authHandler(
  //   email: string,
  //   localId: string,
  //   idToken: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, localId, idToken, expirationDate);

  //   // this.user.next(user);
  //   this.store.dispatch(
  //     new AuthActions.AuthSuccess({
  //       email: email,
  //       userId: localId,
  //       token: idToken,
  //       expirationDate: expirationDate,
  //     })
  //   );
  //   this.autoLogOut(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // requestPoster(
  //   link: string,
  //   email: string,
  //   password: string,
  //   isLoginMode: boolean
  // ) {
  //   return this.http
  //     .post<AuthResponseData>(link, {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true,
  //     })
  //     .pipe(
  //       catchError((errorResponse: HttpErrorResponse) => {
  //         return throwError(() =>
  //           this.errorHandler(errorResponse, isLoginMode)
  //         );
  //       }),
  //       tap((responseData) => {
  //         this.authHandler(
  //           responseData.email,
  //           responseData.localId,
  //           responseData.idToken,
  //           +responseData.expiresIn
  //         );
  //       })
  //     );
  // }

  // signUpIn(email: string, password: string, isLoginMode: boolean) {
  //   this.errorType = null;

  //   if (!isLoginMode) {
  //     return this.requestPoster(this.signUpLink, email, password, isLoginMode);
  //   } else {
  //     return this.requestPoster(this.signInLink, email, password, isLoginMode);
  //   }
  // }

  // logOut() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.LogOut());
  //   localStorage.removeItem('userData');

  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  // }

  // autoLogIn() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));

  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();

  //     this.autoLogOut(expirationDuration);
  //   }
  // }
}
