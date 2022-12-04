import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: WelcomeComponent }]),
  ],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
