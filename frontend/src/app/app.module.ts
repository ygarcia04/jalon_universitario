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
import { RecPasswordComponent } from "./components/rec-password/rec-password.component";


@NgModule({
  declarations: [
    AppComponent,
    RecPasswordComponent
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
