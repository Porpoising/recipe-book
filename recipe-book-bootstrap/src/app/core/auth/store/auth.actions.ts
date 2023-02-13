import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Start logging in';
export const SIGNUP_START = '[Auth] Start signing up';
export const AUTH_SUCCESS = '[Auth] Authentication succeed';
export const AUTH_FAIL = '[Auth] Authentication has failed';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto-login';
export const AUTO_LOGOUT = '[Auth] Auto-logout';
export const CLEAR_ERROR = '[Auth] Clear error';

export const authSuccess = createAction(
  AUTH_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const authFail = createAction(
  AUTH_FAIL,
  props<{
    errorMessage: string;
  }>()
);

export const logout = createAction(LOGOUT);

export const autoLogin = createAction(AUTO_LOGIN);

export const autoLogout = createAction(AUTO_LOGOUT);

export const clearError = createAction(CLEAR_ERROR);
