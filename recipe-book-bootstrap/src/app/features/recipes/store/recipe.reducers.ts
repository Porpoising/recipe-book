import { createReducer, on, Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const _recipeReducer = createReducer(
  initialState,

  on(RecipesActions.setRecipes, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  })),

  on(RecipesActions.addRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.concat({ ...action.recipe }),
  })),

  on(RecipesActions.updateRecipe, (state, action) => {
    const updatedRecipe = {
      ...state.recipes[action.index],
      ...action.recipe,
    };

    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.index] = updatedRecipe;

    console.log(state, action)
    console.log('_______________________')

    return {
      ...state,
      recipes: updatedRecipes,
    };

    // recipes: state.recipes.map((recipe, index) =>
    //   index === action.index ? { ...action.recipe } : recipe
    // ),
  }),

  on(RecipesActions.deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((_, index) => index !== action.index),
  }))
);

export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}
