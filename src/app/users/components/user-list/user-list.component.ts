import { Component, OnInit } from '@angular/core';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';
import { selectUsers, selectUsersError, selectEditedUser } from './../../../core/@ngrx';


import { AutoUnsubscribe } from 'src/app/core';
import { User, UserModel } from '../../models/user.model';
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  editedUser: UserModel;
  usersError$: Observable<Error | string>;
  private subscription: Subscription;


  constructor(
    private store: Store,
  ) { }

  ngOnInit() {

    this.users$ = this.store.pipe(select(selectUsers));
    this.usersError$ = this.store.pipe(select(selectUsersError));
    // this.store.dispatch(UsersActions.getUsers());

    this.subscription = this.store.pipe(select(selectEditedUser)).subscribe({
      next: user => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: err => console.log(err)
    });
  }

  onUserEdit(user: UserModel) {
    const link = ['users/edit', user.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  onUserDelete(user: UserModel) {
    const userToDelete: User = { ...user };
    this.store.dispatch(UsersActions.deleteUser({ user: userToDelete }));

  }
}
