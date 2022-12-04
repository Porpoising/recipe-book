import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'not-found' },
    ]),
  ],
  exports: [NotFoundComponent],
})
export class ViewsModule {}
