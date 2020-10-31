import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import { VerificationComponent} from './components/verification/verification.component';
import { AuthGuard } from "./guards/auth.guard";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { RecPasswordComponent } from "./components/rec-password/rec-password.component";
import {  ChangeRecPassComponent} from "./components/change-rec-pass/change-rec-pass.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { TipousuarioComponent } from "./components/tipousuario/tipousuario.component";
import { DeleteAccountComponent } from "./components/delete-account/delete-account.component";

const routes: Routes = [
{
  path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: InicioComponent
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'type-user',
    component: TipousuarioComponent
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
  },
  {
    path: 'rec-password',
    component: RecPasswordComponent

  },
  {
    path: 'recover-pass',
    component: ChangeRecPassComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
