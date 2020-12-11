//Import de dependencias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // If You need animations
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//Imports de componentes y servicios
import { AuthGuard } from "./guards/auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AuthService } from "./services/auth.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeRecPassComponent } from './components/change-rec-pass/change-rec-pass.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecPasswordComponent } from './components/rec-password/rec-password.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { VerificationComponent } from './components/verification/verification.component';
import { AdminComponent } from './components/admin/admin.component';
import { VerificationLinkComponent } from './components/verification-link/verification-link.component';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';
import { UsersComponent } from './components/users/users.component';
import { UsersActComponent } from './components/users-act/users-act.component';
import { UsersInactComponent } from './components/users-inact/users-inact.component';
import { UsersBloqComponent } from './components/users-bloq/users-bloq.component';
import { SignupdriveComponent } from './components/signupdrive/signupdrive.component';
import { ProfileDriverComponent } from './components/profile-driver/profile-driver.component';
import { EditProfileDriverComponent } from './components/edit-profile-driver/edit-profile-driver.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriversActComponent } from './components/drivers-act/drivers-act.component';
import { DriversInactComponent } from './components/drivers-inact/drivers-inact.component';
import { DriversBloqComponent } from './components/drivers-bloq/drivers-bloq.component';
import { UserdRoutersComponent } from './components/userd-routers/userd-routers.component';
import { JalonesComponent } from './components/jalones/jalones.component';
import { JalonesPendientesComponent } from './components/jalones-pendientes/jalones-pendientes.component';
import { VerificDriverComponent } from './components/verific-driver/verific-driver.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { JalonesDriverComponent } from './components/jalones-driver/jalones-driver.component';
import { JalonesPendientesDriverComponent } from './components/jalones-pendientes-driver/jalones-pendientes-driver.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ChangeRecPassComponent,
    DeleteAccountComponent,
    EditProfileComponent,
    InicioComponent,
    ProfileComponent,
    RecPasswordComponent,
    SigninComponent,
    SignupComponent,
    TipousuarioComponent,
    VerificationComponent,
    AdminComponent,
    VerificationLinkComponent,
    ResendCodeComponent,
    UsersComponent,
    UsersActComponent,
    UsersInactComponent,
    UsersBloqComponent,
    SignupdriveComponent,
    ProfileDriverComponent,
    EditProfileDriverComponent,
    DeleteDriverComponent,
    DriversComponent,
    DriversActComponent,
    DriversInactComponent,
    DriversBloqComponent,
    UserdRoutersComponent,
    JalonesComponent,
    JalonesPendientesComponent,
    VerificDriverComponent,
    RutasComponent,
    JalonesDriverComponent,
    JalonesPendientesDriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComboBoxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
  
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
      
    }
    
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
