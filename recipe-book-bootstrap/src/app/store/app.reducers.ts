import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../features/shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../core/auth/store/auth.reducers';
import * as fromRecipes from '../features/recipes/store/recipe.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
};
