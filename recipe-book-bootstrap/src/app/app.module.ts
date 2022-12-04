import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import * as fromApp from '../app/store/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ViewsModule } from './views/views.module';
import { HeaderComponent } from './layout/header/header.component';
import { WelcomeModule } from './features/welcome/welcome.module';
import { ShoppingListService } from './features/shopping-list/services/shopping-list.service';
import { AuthInterceptorService } from './core/auth/services/auth-interceptor.service';
import { AuthService } from './core/auth/services/auth.service';
import { AuthEffects } from './core/auth/store/auth.effects';
import { RecipeEffects } from './features/recipes/store/recipe.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects, ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    WelcomeModule,
    CoreModule,
    AppRoutingModule,
    ViewsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    ShoppingListService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule {}
