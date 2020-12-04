import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse  } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';

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
  template='';
  validate=true;

  constructor(
    private authservice:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  verify(){
    var pass= this.changePassw.value.contrasenaNueva1;
    console.log(pass);
    if(pass.length<8){
      this.template='<div class="alert alert-warning" role="alert"><div>La contraseña debe tener al menos 8 caracteres.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[0-9]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos un número en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[A-Z]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos una mayúscula en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[a-z]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos una minúscula en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[_\/\*\$.\\\[\]\(\):;º!·&,\?!@#¬'+\{\}`^¨]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos un caracter NO alfa-numérico en su contraseña.</div></div>';
      this.validate=false;
    }else{
      this.template='';
      this.validate=true;
    }
  }

  changePass(){
    if(this.validate==false){
      alertify.error('Verifique todos los campos ingresados');
      return false;
    }
    this.user.contrasenaNueva1 = this.changePassw.value.contrasenaNueva1;
    if(this.user.contrasenaNueva1 ==""){
      this.template='<div class="alert alert-warning" role="alert"><div>No puede dejar la contraseña en blanco.</div></div>';
      return false;
    }
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
