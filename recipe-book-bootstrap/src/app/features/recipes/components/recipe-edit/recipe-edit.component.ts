import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

// import { Recipe } from '../recipe.model';
import * as fromApp from '../../../../store/app.reducers';
import * as RecipeActions from '../../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients,
    // )

    if (this.editMode) {
      this.store.dispatch(
        RecipeActions.updateRecipe({
          index: this.recipeId,
          recipe: this.recipeForm.value,
        })
        // new RecipeActions.UpdateRecipe({
        //   index: this.recipeId,
        //   newRecipe: this.recipeForm.value,
        // })
      );
      // this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.store.dispatch(
        RecipeActions.addRecipe({ recipe: this.recipeForm.value })
      );
      // this.recipeService.addRecipe(this.recipeForm.value);
      // this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
  }

  onNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          //Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    // console.log((<FormArray>this.recipeForm.get('ingredients')).controls);
    // console.log('---------------------------------------------------');

    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.recipeId;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;

          if (recipe['ingredients']) {
            recipeIngredients = new FormArray([])

            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    //Validators.pattern(/^[1-9]+[0-9]*$/)
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
