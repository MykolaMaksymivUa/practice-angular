import { CanDeactivateGuard } from './../core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserFormComponent, UserListComponent } from './components';
import { UserResolveGuard, UsersStatePreloadingGuard } from '.';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent,
        // resolve: {
        //   user: UserResolveGuard
        // }
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   user: UserResolveGuard
        // }
      },
      {
        path: '',
        component: UserListComponent,
        canActivate: [UsersStatePreloadingGuard],
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static components = [UsersComponent, UserFormComponent, UserListComponent];
}
