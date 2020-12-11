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
import { DriversComponent } from './components/drivers/drivers.component';
import { DriversBloqComponent } from './components/drivers-bloq/drivers-bloq.component';
import { DriversActComponent } from './components/drivers-act/drivers-act.component';
import { DriversInactComponent } from './components/drivers-inact/drivers-inact.component';
import { UserdRoutersComponent } from './components/userd-routers/userd-routers.component';
import { VerificDriverComponent } from './components/verific-driver/verific-driver.component';
import { RutasComponent } from "./components/rutas/rutas.component";
import { JalonesComponent } from "./components/jalones/jalones.component";
import { JalonesPendientesComponent } from "./components/jalones-pendientes/jalones-pendientes.component";
import { JalonesDriverComponent } from "./components/jalones-driver/jalones-driver.component";
import { JalonesPendientesDriverComponent } from "./components/jalones-pendientes-driver/jalones-pendientes-driver.component";

const routes: Routes = [
  //verificar driver admin
  {
    path: 'verific-driver',
    component: VerificDriverComponent,
  },
  {
    path:'jalones-user',
    component: JalonesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'jalones-pendientes',
    component: JalonesPendientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'jalones-driver',
    component: JalonesDriverComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'jalones-pendientes-driver',
    component: JalonesPendientesDriverComponent,
    canActivate: [AuthGuard]
  },
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
    path: 'rutas',
    component: RutasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userd-routes',
    component: UserdRoutersComponent,
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
  ,
  {
    path: 'drivers',
    component: DriversComponent,
  },
  {
    path: 'drivers-bloq',
    component: DriversBloqComponent,
  },

  {
    path: 'drivers-act',
    component: DriversActComponent,
  },

  {
    path: 'drivers-inact',
    component: DriversInactComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
