import { Injectable } from "@angular/core";
import {
  Resolve,
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, take, catchError, delay, finalize, tap } from "rxjs/operators";

import { UserModel } from "../models/user.model";
import { UsersServicesModule } from "../users-services.module";
import { SpinnerService } from './../../widgets';

import { Store, select } from '@ngrx/store';
import { selectSelectedUserByUrl } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';
import * as RouterActions from '../../core/@ngrx/router/router.actions';


@Injectable({
  providedIn: UsersServicesModule,
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private store: Store,
    private spinner: SpinnerService,
  ) { }

  resolve(): Observable<UserModel> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(selectSelectedUserByUrl),
      tap(user => this.store.dispatch(UsersActions.setOriginalUser({ user }))),
      delay(2000),
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.store.dispatch(RouterActions.go({
            path: ['/users']
          }));

          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(RouterActions.go({
          path: ['/users']
        }));

        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
