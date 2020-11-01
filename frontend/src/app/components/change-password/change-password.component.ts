import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {
  changePassw: FormGroup = new FormGroup({
    contrasenaActual: new FormControl('', [ Validators.required ]),
    contrasenaNueva1: new FormControl('', [Validators.required, Validators.min(8) ]),
    contrasenaNueva2: new FormControl('', [Validators.required, Validators.min(8) ]),
  });s
  hide = true;
  hide2=true;
  hide3=true;
  get contrasenaActualInput() { return this.changePassw.get('contrasenaActual'); }
  get contrasenaNueva1Input() { return this.changePassw.get('contrasenaNueva1'); }
  get contrasenaNueva2Input() { return this.changePassw.get('contrasenaNueva2'); }
  
  user={
    contrasenaActual:'',
    contrasenaNueva1:'',
    contrasenaNueva2:''
  }

  constructor(
    private authservice:AuthService,
    private router: Router
  ) { 
    ;
  }

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

changePass(){
  Swal.fire({
    title: "Seguro que quiere cambiar su contraseña?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
      this.user.contrasenaActual=this.changePassw.value.contrasenaActual;
      this.user.contrasenaNueva1=this.changePassw.value.contrasenaNueva1;
      this.user.contrasenaNueva2=this.changePassw.value.contrasenaNueva2;
      this.authservice.changePassword(this.user)
  .subscribe(
    res =>{ 
      if(res.estado=='actual'){
        Swal.fire("Error", "Contraseña Actual Errónea", "warning");
      }else if(res.estado=='password'){
        Swal.fire("Error", "No se pudo confirmar la nueva contraseña, verifique que ambos campos sean iguales", "warning");
      }else if(res.estado=='hecho'){
        Swal.fire("Completado", "Su contraseña fue actualizada con éxito", "success");
        this.router.navigate(['/profile']);

      }else if(res.estado=='inactivo'){
        Swal.fire("Su usuario no está activado", "", "warning");
        this.router.navigate(['/verificacion']);

      }else{
      Swal.fire("Error","Hubo un error, favor intente de nuevo", "error");
      }        
    },
    err =>{
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/signin']);
        }
      }
      //this.router.navigate(['/signin']);
      Swal.fire("Error", "Hubo un error en el sistema intente de nuevo", "error");
    }
  )

    }
  })



  
}
}
