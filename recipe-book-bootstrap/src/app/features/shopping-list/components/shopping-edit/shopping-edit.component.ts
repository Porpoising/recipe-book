import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from 'src/app/features/recipes/components/recipe-detail/ingredient.model';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import * as fromApp from '../../../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedIngredient: Ingredient;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        const index = stateData.editIndex
        if (index > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.ingredients[index];
          this.form.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
    // this.subscription = this.shoppingListService.ingredientEdit.subscribe(
    //   (index: number) => {
    //     this.editedIngredientIndex = index;
    //     this.editMode = true;
    //     this.editedIngredient = this.shoppingListService.getIngredient(index);
    //     this.form.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount,
    //     });
    //   }
    // );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({ ingredient: newIngredient })
      );
      // this.shoppingListService.updateIngredient(
      //   this.editedIngredientIndex,
      //   newIngredient
      // );
      // this.store.dispatch(
      //   new ShoppingListActions.UpdateIngredient(newIngredient)
      // );
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ ingredient: newIngredient })
      );
      // this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);
    }

    this.form.reset();
  }

  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    // this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
    // this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
    // this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
