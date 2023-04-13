import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
// import * as fromUser from './user/store/user.reducer';
import * as fromAuth from './store/auth.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children:[
      {
        path:'login',
        component: LoginComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule { }


// imports: [],
// exports: [RouterModule]
