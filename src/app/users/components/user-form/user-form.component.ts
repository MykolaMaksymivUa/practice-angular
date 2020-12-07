import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';

// rxjs
import { pluck, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { User, UserModel } from './../../models/user.model';
import { CanComponentDeactivate, DialogService, AutoUnsubscribe } from './../../../core';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { selectSelectedUserByUrl, selectUsersOriginalUser } from './../../../core/@ngrx';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  user: UserModel;
  private sub: Subscription;

  constructor(
    // private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store,
  ) { }

  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const flags = [];

    return this.store.pipe(
      select(selectUsersOriginalUser),
      switchMap(originalUser => {
        for (const key in originalUser) {
          if (originalUser[key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

        if (flags.every(el => el)) {
          return of(true);
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      })
    );

  }

  ngOnInit(): void {
    // this.activatedRoute.data.pipe(pluck('user')).subscribe((user: UserModel) => {
    //   this.user = { ...user };
    // });
    this.sub = this.store.pipe(select(selectSelectedUserByUrl))
      .subscribe(user => this.user = { ...user });

  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
    console.log('Original destroy');
  }

  onSaveUser() {
    const user = { ...this.user } as User;
    if (user.id) {
      this.store.dispatch(UsersActions.updateUser({ user }));
    } else {
      this.store.dispatch(UsersActions.createUser({ user }));
    }

  }

  onGoBack() {
    this.store.dispatch(RouterActions.back());
  }
}
