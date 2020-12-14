import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {  HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.scss']
})
export class DeleteDriverComponent implements OnInit {

  deleteUserForm: FormGroup = new FormGroup({
    contrasenaNueva1: new FormControl('', [Validators.required, Validators.min(8) ]),
    contrasenaNueva2: new FormControl('', [Validators.required, Validators.min(8) ]),
  });s
  hide2=true;
  hide3=true;
  get contrasenaNueva1Input() { return this.deleteUserForm.get('contrasenaNueva1'); }
  get contrasenaNueva2Input() { return this.deleteUserForm.get('contrasenaNueva2'); }
  
  user={
    contrasenaNueva1:'',
    contrasenaNueva2:''
  }

  constructor(
    private authservice:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authservice.loggedInDriver()){
      this.router.navigate(['/home'])
    }
    this.authservice.userState()
      .subscribe(
        res => {
          if(res.estado=='verificarCorreo'){
            this.router.navigate(['/verification']);
            Swal.fire("Error", "Su cuenta de correo no ha sido verificada", "warning");
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
    this.user.contrasenaNueva1=this.deleteUserForm.value.contrasenaNueva1;
      this.user.contrasenaNueva2=this.deleteUserForm.value.contrasenaNueva2;
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

  deleteUser(){
    this.authservice.deleteDriver(this.user)
    .subscribe(
      res =>{ 
        if(res.estado=='password'){
          Swal.fire("Error", "No se pudo confirmar la contraseña, verifique que ambos campos sean iguales", "warning");
        }else if(res.estado=='hecho'){
          Swal.fire("Completado", "Su usuario fue eliminado de Jalón Universitario", "success");
          this.authservice.logoutDriver();
          this.router.navigate(['/home']);
  
        }else{
        Swal.fire("Error","Hubo un error, favor intente de nuevo", "warning");
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


