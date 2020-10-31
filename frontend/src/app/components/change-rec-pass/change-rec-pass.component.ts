import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse  } from "@angular/common/http";
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-change-rec-pass',
  templateUrl: './change-rec-pass.component.html',
  styleUrls: ['./change-rec-pass.component.scss']
})
export class ChangeRecPassComponent implements OnInit {

  
  user={
    contrasenaNueva1:'',
    contrasenaNueva2:''
  }
  constructor(
    private authservice:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }
  changePass(){
    this.authservice.changeRecPass(this.user)
    .subscribe(
      res =>{ 
        if(res.estado=='password'){
          Swal.fire("Error", "No se pudo confirmar la contraseña, verifique que ambos campos sean iguales", "warning");
        }else if(res.estado=='hecho'){
          Swal.fire("Completado", "Su contraseña fue actualizada con éxito", "success");
          this.router.navigate(['/profile']);
  
        }else{
        Swal.fire("Error","Hubo un error en el sistema, favor intente de nuevo", "warning");
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
