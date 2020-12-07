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
    if(this.authservice.loggedInAdmin()){
      this.router.navigate(['/admin'])
    }
    if(this.authservice.loggedIn()){
      this.router.navigate(['/profile'])
    }
  }

  signIn(){
    this.user.email=this.signin.value.email;
    this.user.password=this.signin.value.password;
    if(!this.user.email.match(/@jalonuniversitario.tk$/) && !this.user.email.match(/@unah.hn$/)){
      Swal.fire("Error", "El correo no se encuentra en la base", "warning");
      return false;
    }
    console.log(this.user);
    this.authservice.signIn(this.user)
    .subscribe(
      res =>{ 
        //manejo de respuestas para ogin de usuario
        if(res.estado=='email'){
          Swal.fire("Error", "Su correo no esta registrado", "warning");     
        }else if(res.estado=='password'&&res.type=='usuario'){
          Swal.fire("Error", "Correo o contraseña incorrectos", "warning");
        }else if(res.estado=='inactivo'&&res.type=='usuario'){
          localStorage.setItem('token', res.token);
          Swal.fire("Inactivo", "Su usuario esta inactivo, debe activarlo para ingresar", "warning");
          this.router.navigate(['/verification']);
        }else if(res.estado=='bloqueado'&&res.type=='usuario'){     
          Swal.fire("Usuario Bloqueado", "Su usuario ha sido bloqueado por intentos de inicio fallidos, podrá recuperar su cuenta, confirmando su correo", "warning");
          this.router.navigate(['/rec-password']);
        }else if(res.estado=='temporal'&&res.type=='usuario'){
          localStorage.setItem('token', res.token);
          Swal.fire("Bienvenido", "Ahora puede cambiar su contraseña", "success");
          this.router.navigate(['/recover-pass']);

        }else if(res.estado=='admin'){
          localStorage.setItem('admin', res.token);
          Swal.fire("Bienvenido","", "success");
          this.router.navigate(['/admin']);
        }else if(res.estado=='hecho'&& res.type=='usuario'){
        console.log(res.token);
        localStorage.setItem('token', res.token);
        Swal.fire("Bienvenido","", "success");
        this.router.navigate(['/profile']);
        }
        //usuario conductor
        else if(res.estado=='hecho'&& res.type=='driver'){
          console.log(res.token);
          localStorage.setItem('driver', res.token);
          Swal.fire("Bienvenido","", "success");
          this.router.navigate(['/profile-driver']);
          }else if(res.estado=='password'&&res.type=='driver'){
            Swal.fire("Error", "Correo o contraseña incorrectos", "warning");
          }else if(res.estado=='inactivo'&& res.type=='driver'){
            localStorage.setItem('driver', res.token);
            Swal.fire("Inactivo", "Se le informará vía correo electrónico una vez haya sido activada su cuenta", "warning");
            this.router.navigate(['/signin']);
          }else if(res.estado=='verificarCorreo' && res.type=='driver'){
            localStorage.setItem('driver', res.token);
            Swal.fire("Correo no verificado", "Proceda a verificarlo para continuar con el proceso de activación de la cuenta", "warning");
            this.router.navigate(['/verification']);
          }else if(res.estado=='bloqueado'&&res.type=='driver'){     
            Swal.fire("Usuario Bloqueado", "Su usuario ha sido bloqueado por intentos de inicio fallidos, podrá recuperar su cuenta, confirmando su correo", "warning");
            this.router.navigate(['/rec-password']);
          }else if(res.estado=='temporal'&&res.type=='driver'){
            localStorage.setItem('driver', res.token);
            Swal.fire("Bienvenido", "Ahora puede cambiar su contraseña", "success");
            this.router.navigate(['/recover-pass']); 
          }else{
          Swal.fire("Error", "No se pudo encontrar su cuenta, intente de nuevo y verifique los datos ingresados", "warning");
        }        
      },
      err =>{
        //this.router.navigate(['/signin']);
        Swal.fire("Error", "Hubo un error en el sistema intente de nuevo", "warning");
        
      }
    )

  }

}
