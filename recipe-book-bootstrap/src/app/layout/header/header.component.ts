import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// import { AuthService } from '../../core/auth/services/auth.service';
// import { DataStorageService } from '../../shared/services/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../core/auth/store/auth.actions';
import * as RecipeActions from '../../features/recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(
    // private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  private userSubscription: Subscription;
  isLoggedIn = false;

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth', 'user')
      // .pipe(
      //   map((appState) => {
      //     return appState.user;
      //   })
      // ) uncomment if 'user' is not included in select method
      .subscribe({
        next: (user) => {
          this.isLoggedIn = !!user;
          // console.log(this.isLoggedIn)
        },
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
