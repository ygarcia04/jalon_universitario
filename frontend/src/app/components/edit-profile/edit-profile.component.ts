import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { resetState } from 'sweetalert/typings/modules/state';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
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
    email:''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(
        res => {//console.log(res.User.nombres);
          this.profile=res.User;
          console.log(this.profile)
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
editarPerfil(){
  
  this.authService.editProfile(this.profile)
  .subscribe(
    res =>{
      if(res.estado=='correo'){
        swal("Error", "Debe usar un correo institucional de la UNAH", "warning");
      this.router.navigate(['/signup']);
      }else if(res.estado=='Fallo'){
        swal("Error", "No se pudieron actualizar sus datos", "warning");
      }else{ 
        swal("Datos Actualizados", "Gracias por mantener actualizados su información", "success");
        this.router.navigate(['/profile']);
      }
      
    },
    err =>{
      swal("Error", "Sus datos ya existen en la base!", "warning");
      this.router.navigate(['/signup']);
    }
  )
}

}

