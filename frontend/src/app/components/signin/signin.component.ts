import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });s
  hide = true;
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }


  user={
    email:'',
    password:''
  }

  constructor(
    private authservice:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signIn(){
    this.user.email=this.signin.value.email;
    this.user.password=this.signin.value.password;
    if(!this.user.password.match(/[+@unah.hn]/)){
      Swal.fire("Error", "Solo los correos institucionales de la UNAH son permitidos", "warning");
      return false;
    }
    console.log(this.user);
    this.authservice.signIn(this.user)
    .subscribe(
      res =>{ 
        if(res.estado=='email'){
          Swal.fire("Error", "Su correo no esta registrado", "warning");
          
        }else if(res.estado=='password'){
          Swal.fire("Error", "Correo o contraseña incorrectos", "warning");
        }else if(res.estado=='inactivo'){
          localStorage.setItem('token', res.token);
          Swal.fire("Inactivo", "Su usuario esta inactivo, debe activarlo para ingresar", "warning");
          this.router.navigate(['/verification']);

        }else if(res.estado=='temporal'){
          localStorage.setItem('token', res.token);
          Swal.fire("Bienvenido", "Ahora puede cambiar su contraseña", "success");
          this.router.navigate(['/recover-pass']);

        }else{
        console.log(res.token);
        localStorage.setItem('token', res.token);
        Swal.fire("Bienvenido","", "success");
        this.router.navigate(['/profile']);
        }        
      },
      err =>{
        //this.router.navigate(['/signin']);
        Swal.fire("Error", "Hubo un error en el sistema intente de nuevo", "warning");
        
      }
    )

  }

}
