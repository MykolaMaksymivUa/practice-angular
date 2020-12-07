import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer, RouterEffects } from './';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { metaReducers } from './meta-reducers';
import { UsersStoreModule } from './users/users-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Instrumentation must be imported after importing StoreModule (config is optional)
    // Should be first ngrx module at imports
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true,      // default value is true
        strictActionImmutability: true,     // default value is true
        strictStateSerializability: false,   // default value is false
        strictActionSerializability: false,  // default value is false
        strictActionWithinNgZone: true,     // default value is false
        strictActionTypeUniqueness: true    // default value is false
      }
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      // routerState: RouterState.Minimal
      serializer: CustomSerializer // has a priority over routerState
    }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TasksStoreModule,
    UsersStoreModule
  ]
})
export class RootStoreModule { }
