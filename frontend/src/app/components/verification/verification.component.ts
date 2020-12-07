import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  user ={
    codigo:''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit():void {
    
  }

  verification(){
    this.authService.verification(this.user)
      .subscribe(
        res =>{ 
          if(res.estado=='Fallo'){
            Swal.fire("Error", "El codigo no coincide con el enviado a su correo", "warning");
            console.log(res.token);
            this.router.navigate(['/verification']);
          }else if(res.estado=='Sistema'){
            Swal.fire("Error", "Hubo un fallo en el sistema, por favor intente de nuevo", "warning");
            this.router.navigate(['/verification']);
            console.log(res.token);
          }else if(res.estado=='Hecho' && res.type=='driver'){
            Swal.fire("Cuenta Verificada", "Gracias por registrarse con nosotros", "success");
            console.log(res.token)
            this.router.navigate(['/home']);
          }else{
          //localStorage.setItem('item', res.token);
          Swal.fire("Cuenta Verificada", "Gracias por registrarse con nosotros", "success");
          this.router.navigate(['/profile']);
          }        
        },
        err =>{
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Hola');
              this.router.navigate(['/signin']);
            }
          }else{
          //this.router.navigate(['/signin']);
          Swal.fire("Error", "El codigo no coincide con el enviado a su correo", "warning");
          this.router.navigate(['/verification']);
          }
        }
      )
  }


}
