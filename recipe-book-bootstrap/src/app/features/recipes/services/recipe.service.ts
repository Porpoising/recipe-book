import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor() {}

  private recipes: Recipe[] = [
    // new Recipe(
    //   "McDonald's Big Mac®",
    //   `Ever wondered what\'s on a Big Mac®?
    //      The McDonald\'s Big Mac® is a 100% beef burger with a taste like no other.
    //      The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac®
    //      sauce sandwiched between a sesame seed bun. It\’s topped off with pickles,
    //      crisp shredded lettuce, finely chopped onion, and a slice of American cheese.
    //      It contains no artificial flavors, preservatives, or added colors from artificial sources.
    //      Our pickle contains an artificial preservative, so skip it if you like.`,
    //   'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-3-product-tile-desktop?wid=830&hei=516&dpr=off',
    //   [
    //     new Ingredient('Sezame seed burger bun', '1'),
    //     new Ingredient('Burger lower bun', '2'),
    //     new Ingredient('Big Mac sauce', '15g'),
    //     new Ingredient('Beef', '200g'),
    //     new Ingredient('Cucumber slices', '4'),
    //     new Ingredient('Onion', '20g'),
    //     new Ingredient('Salad', '20g'),
    //     new Ingredient('Cheese', '30g'),
    //   ]
    // ),
    // new Recipe(
    //   'Burger King Whopper®',
    //   `A ¼ lb* of flame-grilled beef patty topped with juicy tomatoes,
    //      crisp lettuce, creamy mayonnaise, ketchup, crunchy pickles,
    //      and sliced white onions on a toasted sesame seed bun.`,
    //   'https://eda.yandex/images/3581687/97eec120bc52f30e557bc6572202b575-300x300.jpeg',
    //   [
    //     new Ingredient('Sezame seed burger bun', '1'),
    //     new Ingredient('Burger lower bun', '1'),
    //     new Ingredient('Salad', '30g'),
    //     new Ingredient('Tomato slices', '4'),
    //     new Ingredient('Cucumber slices', '4'),
    //     new Ingredient('Cheese slices', '2'),
    //     new Ingredient('Onion rings', '6'),
    //     new Ingredient('Ketchup', '15g'),
    //     new Ingredient('Beef', '200g'),
    //   ]
    // ),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipeList() {
    return this.recipes.slice();
  }

  getRecipe(recipeId: number) {
    return this.recipes[recipeId];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
