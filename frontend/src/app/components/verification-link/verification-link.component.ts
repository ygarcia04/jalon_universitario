import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-verification-link',
  templateUrl: './verification-link.component.html',
  styleUrls: ['./verification-link.component.scss']
})
export class VerificationLinkComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    try {
      this.activatedRoute.queryParams.subscribe(params => {
        let userMail = params['user'];
        let userMail2=params['user1'];
        let code = params['code'];
        if(userMail){
            this.authService.getVerificationCode(userMail,code,userMail2)
          .subscribe(
            res=>{
              if(res.estado=='Hecho'){
                Swal.fire("Cuenta Verificada", "Gracias por registrarse con nosotros", "success");
                localStorage.setItem('token', res.token);
                this.router.navigate(['/profile']);
              }else{
                Swal.fire("Error", "Link erroneo, no se encontró el usuario, intente verificar manualmente su cuenta entrando al sistema", "warning");
                  this.router.navigate(['/signin']);
              }
          },
            err=>{
              Swal.fire("Error", "Hubo un error en el sistema, intente de nuevo mas tarde", "warning");
                  this.router.navigate(['/signin']);
            }
          ) 
        }else{
          this.router.navigate(['/verification']);
        }
        
    });
    } catch (error) {
      console.log('error')
    }
    
   }

  ngOnInit(): void {
  }

}
