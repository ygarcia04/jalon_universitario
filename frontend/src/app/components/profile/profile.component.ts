import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
//para redireccionar
import { Router } from "@angular/router";
import Sawl from "sweetalert2/dist/sweetalert2.js";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
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
    email:'',
    fechaNacimiento:'',
    facultad:'',
    edad:''
  }

  constructor(public authService: AuthService, private miDatePipe: DatePipe,
    private router: Router) { }



    
/*<!--?xml version="1.0" encoding="utf-8"?><!-- the root web configuration file -->
<configuration>
	

<system.webServer>
  <rewrite>
    <rules>
      <rule name="Angular Routes" stopProcessing="true">
        <match url=".*" />
        <conditions logicalGrouping="MatchAll">
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
        </conditions>
        <action type="Rewrite" url="/" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>

</configuration-->
*/



  ngOnInit() {
    if(this.authService.loggedInAdmin()){
      this.router.navigate(['/admin']);
    }else{
    this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Sawl.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }else{
          this.authService.getProfile()
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.profile=res.User;
              let currDate = new Date();
              this.profile.edad= this.getEdad(this.profile.fechaNacimiento);  
              console.log(this.profile.edad)      
             this.profile.fechaNacimiento= this.fomatearFecha(this.profile.fechaNacimiento);        
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
  }

  getEdad(fecha){
    let currDate = new Date();
    var opciones={ year: 'numeric'};
    var anio = currDate.toLocaleString( 'es-MX', opciones);
    var nac = new Date(fecha);
    var anio_nac =nac.toLocaleString( 'es-MX' , opciones);
    var edad=Number.parseInt(anio, 10)-Number.parseInt(anio_nac, 10);
    return edad.toString();
  }

  fomatearFecha(fecha){
    var date = new Date(fecha);
    var opciones={ weekday:'long', year: 'numeric', month:'long', day:'numeric'};
    return date.toLocaleString('es-MX', opciones);

  }

  editar(){
    this.router.navigate(['/edit-profile']);
  }

}

