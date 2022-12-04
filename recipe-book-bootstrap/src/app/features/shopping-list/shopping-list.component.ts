import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// import { ShoppingListService } from './services/shopping-list.service';
import { Ingredient } from '../recipes/components/recipe-detail/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsObservable: Observable<{ ingredients: Ingredient[] }>;
  // private igChangeSub: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredientsList();
    // this.igChangeSub = this.shoppingListService.ingredientAdded.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.ingredientsObservable = this.store.select('shoppingList');
  }

  onItemEdit(index: number) {
    // this.shoppingListService.ingredientEdit.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }
}
