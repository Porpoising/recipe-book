import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../recipes/components/recipe-detail/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS =
  '[Shopping List] Add all ingredients from selected recipe';
export const UPDATE_INGREDIENT = '[Shopping List] Update ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete ingredient';
export const START_EDIT = '[Shopping list] Start ingredient editing';
export const STOP_EDIT = '[Shopping List] Stop ingredient editing';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{
    ingredient: Ingredient;
  }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{
    ingredients: Ingredient[];
  }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{
    ingredient: Ingredient;
  }>()
);

export const deleteIngredient = createAction(DELETE_INGREDIENT);

export const startEdit = createAction(
  START_EDIT,
  props<{
    index: number;
  }>()
);

export const stopEdit = createAction(STOP_EDIT);
