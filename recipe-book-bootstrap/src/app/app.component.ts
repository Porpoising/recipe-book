import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app/store/app.reducers';
import * as AuthActions from '../app/core/auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  loadedFeature = 'recipes';

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    // this.store.dispatch(new AuthActions.AutoLogin());
  }
}
