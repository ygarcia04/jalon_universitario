import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { resetState } from 'sweetalert/typings/modules/state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile={
    nombres:'',
    direccion:'',
    apellidos:'',
    registro:'',
    telefono:'',
    carrera:'',
    numeroCuenta:'',
    email:''
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(
        res => {//console.log(res.User.nombres);
          this.profile=res.User;
          console.log(this.profile)
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

  editar(){
    this.router.navigate(['/edit-profile']);
  }

}
