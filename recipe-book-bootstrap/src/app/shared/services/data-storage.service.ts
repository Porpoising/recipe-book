import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers'
import * as RecipeActions from '../../features/recipes/store/recipe.actions'
import { Recipe } from '../../features/recipes/recipe.model';
import { RecipeService } from 'src/app/features/recipes/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipeList();
    this.http
      .put(
        'https://recipe-book-ea800-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-ea800-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        //rxjs map method here
        map((recipes) => {
          //standart map method
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
