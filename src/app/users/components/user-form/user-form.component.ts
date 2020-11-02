import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { UserObservableService } from './../../';

import { CanComponentDeactivate, DialogService, AutoUnsubscribe } from './../../../core';
// @AutoUnsubscribe('userSub')
@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  user: UserModel;
  originalUser: UserModel;
  private userSub: Subscription;
  constructor(
    private userObsService: UserObservableService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private location: Location,
  ) { }

  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const flags = Object.keys(this.originalUser).map(key => {
      // @refactor it.
      this.user.lastEdited = this.originalUser.lastEdited;

      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  ngOnInit(): void {
    this.userSub = this.activatedRoute.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
      this.originalUser = { ...user };
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveUser() {
    const user = { ...this.user };
    const userId = user.id;

    // if (user.id) {
    //   this.userObsService.updateUser(user);
    //   this.router.navigate(['/users', { editedUserID: user.id }]);
    // } else {
    //   this.userObsService.createUser(user);
    //   this.onGoBack();
    // }
    // this.originalUser = { ...this.user };

    const method = user.id ? 'updateUser' : 'createUser';
    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = { ...savedUser };
        userId
          ? this.router.navigate(['/users', { editedUserID: userId }])
          : this.onGoBack();
      }
    };

    this.userSub = this.userObsService[method](user).subscribe(observer);
  }

  onGoBack() {
    // activated route: users/edit/userID
    // this.router.navigate(['./../../'], { relativeTo: this.activatedRoute });
    this.location.back();
  }
}
