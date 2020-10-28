import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { resetState } from 'sweetalert/typings/modules/state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
    this.authservice.signIn(this.user)
    .subscribe(
      res =>{ 
        if(res.estado=='email'){
          swal("Error", "Su correo no esta registrado", "warning");
          this.router.navigate(['/signup']);
        }else if(res.estado=='password'){
          swal("Error", "Correo o contraseña incorrectos", "warning");
        }else if(res.estado=='inactivo'){
          localStorage.setItem('item', res.token);
          swal("Error", "Su usuario esta inactivo, debe activarlo para ingresar", "warning");
          this.router.navigate(['/verification']);

        }else{
        localStorage.setItem('item', res.token);
        swal("Bienvenido","", "success");
        this.router.navigate(['/profile']);
        }        
      },
      err =>{
        //this.router.navigate(['/signin']);
        swal("Error", "Hubo un error en el sistema intente de nuevo", "warning");
        this.router.navigate(['/signin']);
      }
    )

  }

}
