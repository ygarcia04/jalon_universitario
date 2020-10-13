import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TasksComponent} from './components/tasks/tasks.component';
import { SigninComponent} from './components/signin/signin.component';
import {PrivateTasksComponent} from './components/private-tasks/private-tasks.component';
import {SignupComponent} from './components/signup/signup.component';
import { VerificationComponentsComponent} from './components/verification-components/verification-components.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'verification',
    component: VerificationComponentsComponent
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
    path: 'tasks',
    component: TasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
