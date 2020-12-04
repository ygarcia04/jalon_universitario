import { Component } from '@angular/core';
import { AuthService  } from "./services/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
anio:Number;
  constructor(public authService: AuthService){
  let date = new Date();
   this.anio=date.getFullYear(); 

  }
  title = 'frontend';
}
