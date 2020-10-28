import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import swal from 'sweetalert';

@Component({
  selector: 'app-verification-components',
  templateUrl: './verification-components.component.html',
  styleUrls: ['./verification-components.component.css']
})
export class VerificationComponentsComponent implements OnInit {

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
            swal("Error", "El codigo no coincide con el enviado a su correo", "warning");
            console.log(res.token);
            this.router.navigate(['/verification']);
          }else if(res.estado=='Sistema'){
            swal("Error", "Hubo un fallo en el sistema, por favor intente de nuevo", "warning");
            this.router.navigate(['/verification']);
            console.log(res.token);
          }else{
          //localStorage.setItem('item', res.token);
          swal("Cuenta Verificada", "Gracias por registrarse con nosotros", "success");
          this.router.navigate(['/profile']);
          }        
        },
        err =>{
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }else{
          //this.router.navigate(['/signin']);
          swal("Error", "El codigo no coincide con el enviado a su correo", "warning");
          this.router.navigate(['/verification']);
          }
        }
      )
  }


}
