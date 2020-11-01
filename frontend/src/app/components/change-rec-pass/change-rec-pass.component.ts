import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse  } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-change-rec-pass',
  templateUrl: './change-rec-pass.component.html',
  styleUrls: ['./change-rec-pass.component.scss']
})
export class ChangeRecPassComponent implements OnInit {

  changePassw: FormGroup = new FormGroup({
    contrasenaNueva1: new FormControl('', [Validators.required, Validators.min(8) ]),
    contrasenaNueva2: new FormControl('', [Validators.required, Validators.min(8) ]),
  });s
  hide2=true;
  hide3=true;
  get contrasenaNueva1Input() { return this.changePassw.get('contrasenaNueva1'); }
  get contrasenaNueva2Input() { return this.changePassw.get('contrasenaNueva2'); }
  
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
    this.user.contrasenaNueva1=this.changePassw.value.contrasenaNueva1;
      this.user.contrasenaNueva2=this.changePassw.value.contrasenaNueva2;
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
