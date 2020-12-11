import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
//para redireccionar
import { Router , ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DatePipe } from '@angular/common';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'abe-verific-driver',
  templateUrl: './verific-driver.component.html',
  styleUrls: ['./verific-driver.component.scss'],
  providers: [DatePipe]
})
export class VerificDriverComponent implements OnInit {
  constructor(public authService: AuthService, private miDatePipe: DatePipe,
  private router: Router, private activatedRoute: ActivatedRoute) { }
  imgDriver: any;
  imgRevision: any;
  imgLicencia: any;
  imgPlaca: any

  driver={
    email_1:'',
    nombres:'',
    direccion:'',
    apellidos:'',
    identidad: '',
    registro:'',
    telefono:'',
    carrera:'',
    numeroCuenta:'',
    email:'',
    fechaNacimiento:'',
    facultad:'',
    edad:'',
    estado:'',
    picPerfil:'',
    mesRegistro:'',
    anioRegistro:'',
    marca:'',
    modelo:'',
    tipo:'',
    color:'',
    anio:'',
    placa:'',
    picLicencia:'',
    picRevision:'',
    picPlaca:''
  }
  email = {
    email:''
  }

  ngOnInit(): void {
    /*if(this.authService.loggedIn()){
      this.router.navigate(['/profile']);
    }if(this.authService.loggedInDriver()){
      this.router.navigate(['/profile-driver']);
    }else{*/

    if(!this.authService.loggedInAdmin()){
      this.router.navigate(['/home']);
    }else{
      this.activatedRoute.queryParams.subscribe(params => {
        let userMail = params['user'];
        if(userMail){
          this.email.email=userMail
          this.authService.getDriver(this.email)
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.driver=res.Driver;
              console.log(this.driver.email);
              let currDate = new Date();
              this.driver.edad= this.getEdad(this.driver.fechaNacimiento);  
              console.log(this.driver.edad)      
              this.driver.fechaNacimiento= this.fomatearFecha(this.driver.fechaNacimiento);
              this.getImageDriver().subscribe(x => {console.log(x);this.imgDriver = x}) 
              this.getImageLicencia().subscribe(x => {console.log(x);this.imgLicencia= x})
              this.getImageRevision().subscribe(x => {console.log(x);this.imgRevision = x})
              this.getImagePlaca().subscribe(x => {console.log(x);this.imgPlaca= x})
            },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['/signin']);
                }
              }
            }
          )
        }else{
          this.router.navigate(['/admin']);
        }
        
    });
    }
  }

  getEdad(fecha){
    let currDate = new Date();
    var opciones={ year: 'numeric'};
    var anio = currDate.toLocaleString( 'es-MX', opciones);
    var nac = new Date(fecha);
    var anio_nac =nac.toLocaleString( 'es-MX' , opciones);
    var edad=Number.parseInt(anio, 10)-Number.parseInt(anio_nac, 10);
    return edad.toString();
  }

  fomatearFecha(fecha){
    var date = new Date(fecha);
    var opciones={ weekday:'long', year: 'numeric', month:'long', day:'numeric'};
    return date.toLocaleString('es-MX', opciones);

  }

  notificacion(){
    if(!this.authService.loggedInAdmin()){
      this.router.navigate(['/profile']);
    }else{
          this.authService.notification(this.email)
          .subscribe(
            res => {
              if(res.estado=='Driver'){
                Swal.fire("Error", "No se ha podido verificar la cuenta", "warning");
              }else if(res.estado == 'Hecho'){ 
                Swal.fire("Usuario verificado", "Se ha enviado un correo al usuario, notificando la activación de su cuenta", "success")
                .then((avanzar)=>{
                  this.router.navigate(['/drivers-inact']);
                })
              }
              
            },
            err =>{
              Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "warning");
              
            }
          )
                
          }
        }   

  getImageDriver(): Observable<SafeResourceUrl> {
    return  this.authService.getProfilePicDriverAdmin(this.email.email);
  }

  getImageLicencia(): Observable<SafeResourceUrl> {
    return  this.authService.getProfileLicenciad(this.email.email);
  }

  getImageRevision(): Observable<SafeResourceUrl> {
    return  this.authService.getProfileRevisiond(this.email.email);
  }

  getImagePlaca(): Observable<SafeResourceUrl> {
    return  this.authService.getProfilePlacad(this.email.email);
  }

}
