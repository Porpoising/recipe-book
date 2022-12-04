import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

// import { ShoppingListService } from 'src/app/features/shopping-list/services/shopping-list.service';
// import { Ingredient } from './ingredient.model';
// import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe.model';
import * as ShoppingListActions from 'src/app/features/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../../../store/app.reducers';
import * as RecipeActions from '../../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(
    // private recipeService: RecipeService,
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipes, index) => {
            return index === this.recipeId;
          });
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  ingredientsToShoppingList() {
    // this.recipe.ingredients.forEach((ingredient: Ingredient) => {
    //   this.shoppingListService.addIngredient(ingredient);
    // });
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onEditRecipe() {
    // this.router.navigate(['../', this.recipeId, 'edit'], {relativeTo: this.activatedRoute})
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeId);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }
}
