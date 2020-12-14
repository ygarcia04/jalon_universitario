import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";


@Component({
  selector: 'abe-profile-driver',
  templateUrl: './profile-driver.component.html',
  styleUrls: ['./profile-driver.component.scss']
})
export class ProfileDriverComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router) { }
    imgURL: any;
    profile={
      nombres:'',
      direccion:'',
      apellidos:'',
      registro:'',
      telefono:'',
      carrera:'',
      numeroCuenta:'',
      email:'',
      fechaNacimiento:'',
      facultad:'',
      edad:''
    }

    ngOnInit() {
      if(this.authService.loggedInAdmin()){
        this.router.navigate(['/admin']);
      }if(this.authService.loggedIn()){
        this.router.navigate(['/profile']);
      }else{
        
      this.authService.userState()
      .subscribe(
        res => {
          if(res.estado=='inactivo'){
            this.router.navigate(['/home']);
            Swal.fire("Error", "Su cuenta debe estar activa para usar Jalón Universitario", "warning");
          }else if(res.estado=='verificarCorreo'){
            this.router.navigate(['/verification']);
            Swal.fire("Error", "Su cuenta de correo no ha sido verificada", "warning");
          }else{
            this.authService.getProfile()
            .subscribe(
              res => {
                this.profile=res.Driver;
                let currDate = new Date();
                this.profile.edad= this.getEdad(this.profile.fechaNacimiento);       
               this.profile.fechaNacimiento= this.fomatearFecha(this.profile.fechaNacimiento);
               this.getImage().subscribe(x => {this.imgURL = x})        
              },
              err => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.router.navigate(['/signin']);
                  }
                }
              }
            )
            
          }       
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
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
  
    editar(){
      this.router.navigate(['/edit-profile-driver']);
    }
  
    getImage(): Observable<SafeResourceUrl> {
      return  this.authService.getProfilePicDriver();
    }
  

}
