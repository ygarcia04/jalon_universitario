import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import {  HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  user={
    contrasenaNueva1:'',
    contrasenaNueva2:''
  }

  constructor(
    private authservice:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authservice.userState()
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

  deleteUser(){
    this.authservice.deleteUser(this.user)
    .subscribe(
      res =>{ 
        if(res.estado=='password'){
          Swal.fire("Error", "No se pudo confirmar la contraseña, verifique que ambos campos sean iguales", "warning");
        }else if(res.estado=='hecho'){
          Swal.fire("Completado", "Su usuario fue eliminado de Jalón Universitario", "success");
          this.authservice.logout();
          this.router.navigate(['/home']);
  
        }else{
        Swal.fire("Error","Hubo un error, favor intente de nuevo", "warning");
        }        
      },
      err =>{
        //this.router.navigate(['/signin']);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
        Swal.fire("Error", "Hubo un error en el sistema intente de nuevo", "warning");
      }
    )

  }

}
