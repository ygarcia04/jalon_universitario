import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";



@Component({
  selector: 'app-rec-password',
  templateUrl: './rec-password.component.html',
  styleUrls: ['./rec-password.component.scss']
})
export class RecPasswordComponent implements OnInit {
  user={
    email:''
  }

  constructor(
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
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

   recPass(){
     console.log(this.user);
     this.authService.recPass(this.user)
     .subscribe(
      res =>{ 
        if(res.estado=='Nocorreo'){
          Swal.fire("Error", "No se encontró su correo", "warning");
        }else if(res.estado=='hecho'){
          Swal.fire("Completado", "Se envió una contraseña de acceso temporal a su correo", "success");
          this.router.navigate(['/signin']); 
        }else if(res.estado=='correo'){
          Swal.fire("Error", "El correo ingresado no es de la UNAH", "warning");
        }else if(res.estado=='noEnviado'){
          Swal.fire("Error", "No se pudo enviar el correo, favor intente de nuevo", "warning");
        }           
      },
      err =>{
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
        Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo", "warning");
      }
    )

   }
}
