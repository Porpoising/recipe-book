import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder/placeholder.directive';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, PlaceholderDirective, AlertComponent],
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    AlertComponent,
  ],
})
export class SharedModule {}
