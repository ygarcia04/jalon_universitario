import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TasksComponent} from './components/tasks/tasks.component';
import { SigninComponent} from './components/signin/signin.component';
import {PrivateTasksComponent} from './components/private-tasks/private-tasks.component';
import {SignupComponent} from './components/signup/signup.component';
import { VerificationComponentsComponent} from './components/verification-components/verification-components.component';
import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full'
  },
  {
    path: 'verification',
    component: VerificationComponentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
