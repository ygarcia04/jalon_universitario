import { Component } from '@angular/core';
import { AuthService  } from "./services/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
anio:Number;
numero:Number;
  constructor(public authService: AuthService){
    let date = new Date();
    this.anio=date.getFullYear();
    if(this.authService.loggedInDriver()){
      const source = interval(1000);
    //output: 0,1,2,3,4,5....
    const subscribe = source.subscribe(val => 
        this.authService.getCountJalones().subscribe(
          res=>{this.numero=res.Usuario; console.log(res)},
          err=>{console.log('Error')}
        ))

  }
    }
   
  title = 'frontend';
}
