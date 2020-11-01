import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profile={
    nombres:'',
    direccion:'',
    apellidos:'',
    registro:'',
    telefono:'',
    carrera:'',
    numeroCuenta:'',
    email:'',
    facultad:''
  }
  public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
  'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
  'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }else{
          this.authService.getProfile()
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.profile=res.User;
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

  /*PARA REVISAR SI EL USUARIO ESTA ACTIVADO
  this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }else{
          this.authService.getProfile()
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.profile=res.User;
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


  */
  
editarPerfil(){
  Swal.fire({
    title: "Seguro que quieres actualizar tus cuenta?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
  this.authService.editProfile(this.profile)
  .subscribe(
    res =>{
      if(res.estado=='correo'){
        Swal.fire("Error", "Debe usar un correo institucional de la UNAH", "warning");
      this.router.navigate(['/signup']);
      }else if(res.estado=='Fallo'){
        Swal.fire("Error", "No se pudieron actualizar sus datos", "warning");
      }else{ 
        Swal.fire("Datos Actualizados", "Gracias por mantener actualizados su información", "success");
        this.router.navigate(['/profile']);
      }
      
    },
    err =>{
      Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "warning");
      
    }
  )
    }
  })
  
  
}


deleteAccount(){
  Swal.fire({
    title: "Seguro que quieres eliminar tu cuenta?",
    text: "Una vez eliminada su cuenta no podrá recuperarla",
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
      this.router.navigate(['/delete-account']);
    }
  })
  
}

}

