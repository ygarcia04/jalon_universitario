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
import { SignupadminComponent } from "./components/signupadmin/signupadmin.component";
import { AdminComponent } from "./components/admin/admin.component";
import { VerificationLinkComponent } from "./components/verification-link/verification-link.component";
import { ResendCodeComponent } from "./components/resend-code/resend-code.component";
import { UsersComponent } from './components/users/users.component';
import { UsersBloqComponent } from './components/users-bloq/users-bloq.component';
import { UsersActComponent } from './components/users-act/users-act.component';
import { UsersInactComponent } from './components/users-inact/users-inact.component';
import { SignupdriveComponent } from "./components/signupdrive/signupdrive.component";
import { ProfileDriverComponent } from "./components/profile-driver/profile-driver.component";
import { EditProfileDriverComponent } from "./components/edit-profile-driver/edit-profile-driver.component";
import { DeleteDriverComponent } from "./components/delete-driver/delete-driver.component";

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
    path: 'signupa',
    component: SignupadminComponent
  },
  {
    path: 'verification-link',
    component: VerificationLinkComponent
  },
  {
    path: 'delete-user',
      component: DeleteDriverComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'signup-driver',
    component: SignupdriveComponent
  },
  {
    path: 'edit-profile-driver',
    component: EditProfileDriverComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'resend-code',
    component: ResendCodeComponent,
    canActivate: [AuthGuard]
},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
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
    path: 'profile-driver',
    component: ProfileDriverComponent,
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
  },

  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users-bloq',
    component: UsersBloqComponent,
  },

  {
    path: 'users-act',
    component: UsersActComponent,
  },

  {
    path: 'users-inact',
    component: UsersInactComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
