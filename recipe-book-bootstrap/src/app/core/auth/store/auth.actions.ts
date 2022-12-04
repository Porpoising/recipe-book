import { Action, createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Start logging in';
export const SIGNUP_START = '[Auth] Start signing up';
export const AUTH_SUCCESS = '[Auth] Authentication succeed';
export const AUTH_FAIL = '[Auth] Authentication has failed';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto-login';
export const AUTO_LOGOUT = '[Auth] Auto-logout';
export const CLEAR_ERROR = '[Auth] Clear error';

// export const logInSuccess = createAction(
//   LOGIN_SUCCESS,
//   props<{
//     email: string;
//     userId: string;
//     token: string;
//     expirationDate: Date;
//   }>()
// );

// export const logInStart = createAction(
//   LOGIN_START,
//   props<{
//     email: string;
//     password: string;
//   }>()
// );

// export const authSuccess = createAction(
//   AUTH_SUCCESS,
//   props<{
//     email: string;
//     userId: string;
//     token: string;
//     expirationDate: Date;
//     redirect: boolean;
//   }>
// );

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type Actions =
  | AuthSuccess
  | Logout
  | AuthFail
  | LoginStart
  | SignupStart
  | ClearError
  | AutoLogin
  | AutoLogout;
