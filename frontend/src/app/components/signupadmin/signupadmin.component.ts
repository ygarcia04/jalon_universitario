import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-signupadmin',
  templateUrl: './signupadmin.component.html',
  styleUrls: ['./signupadmin.component.scss']
})
export class SignupadminComponent implements OnInit {
  user={
    nombres : 'Eduardo',
    apellidos : 'Cueva',
    email : 'ecueva@jalonuniversitario.cf',
    password : 'Admin123#'
  }

  constructor( private authService: AuthService
    ) {  } 

  ngOnInit(): void {
    
    
  }

  signupa(){
    console.log('noefnoeife')
    this.authService.signupa(this.user)
    .subscribe( 
      res => {console.log (res)},
      err => {console.log (err)}
    )
  }
}
