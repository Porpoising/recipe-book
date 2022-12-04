// import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// import { AuthService } from './services/auth.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../../shared/directives/placeholder/placeholder.directive';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string;
  errorType: number;
  alertSub: Subscription;
  storeSub: Subscription;

  constructor(
    // private authService: AuthService,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;

      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onNullError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(errorMessage: string) {
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<AlertComponent>(AlertComponent);

    componentRef.instance.errorMessage = errorMessage;
    this.alertSub = componentRef.instance.closeAlert.subscribe(() => {
      this.alertSub.unsubscribe();
      viewContainerRef.clear();
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorType = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
    // this.authService.signUpIn(email, password, this.isLoginMode).subscribe({
    //   next: (responseData) => {
    //     console.log(responseData);
    //     this.router.navigate(['/recipes']);
    //     form.reset();
    //   },
    //   error: (errorResponse) => {
    //     // console.log(errorResponse);
    //     this.errorMessage = errorResponse.errorMessage;
    //     // this.showErrorAlert(this.errorMessage);
    //     this.errorType = errorResponse.errorType;
    //   },
    // });

    form.reset();
  }
}
