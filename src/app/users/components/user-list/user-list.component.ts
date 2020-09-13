import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { UserModel } from '../../models/user.model';
import { UserArrayService, UserObservableService } from '../../';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  editedUser: UserModel;

  constructor(
    private userArrayService: UserArrayService,
    private userObsService: UserObservableService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.users$ = this.userObsService.getUsers();

    const obs = {
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        // this.editedUser.lastEdited = new Date();
        // this.userArrayService.updateUser(this.editedUser);
      },
      error: (err) => console.log(err)
    }

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('editedUserID')
          ? this.userObsService.getUser(+params.get('editedUserID'))
          : of(null);
      })
    ).subscribe(obs);
  }

  onUserEdit(user: UserModel) {
    const link = ['edit', user.id];
    this.router.navigate(link, { relativeTo: this.activatedRoute });
  }

  onUserDelete(user: UserModel) {
    this.users$ = this.userObsService.deleteUser(user);
  }
}
