import { CustomPreloadingStrategy } from './core';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from "@angular/router"
import { PathNotFoundComponent, AboutComponent, MessagesComponent, LoginComponent } from './layout/components';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages'
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    data: { title: 'Admin' },
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    data: {
      preload: true,
      title: 'Users',
    },
  },
  {
    path: '**',
    component: PathNotFoundComponent
  }
];

const config: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategy, //PreloadAllModules
  // enableTracing: true,
  // useHash: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {

}