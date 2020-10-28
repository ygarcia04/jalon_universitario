import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { resetState } from 'sweetalert/typings/modules/state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

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
  }

changePass(){
  this.authservice.changePassword(this.user)
  .subscribe(
    res =>{ 
      if(res.estado=='actual'){
        swal("Error", "Contraseña Actual Errónea", "warning");
      }else if(res.estado=='password'){
        swal("Error", "No se pudo confirmar la contraseña, verifique que ambos campos sean iguale", "warning");
      }else if(res.estado=='hecho'){
        swal("Completado", "Su contraseña fue actualizada xon éxito", "success");
        this.router.navigate(['/profile']);

      }else{
      swal("Error","Hubo un error, favor intente de nuevo", "warning");
      }        
    },
    err =>{
      //this.router.navigate(['/signin']);
      swal("Error", "Hubo un error en el sistema intente de nuevo", "warning");
    }
  )

}
}
