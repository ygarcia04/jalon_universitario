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
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

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
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ShowHidePasswordModule,
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
