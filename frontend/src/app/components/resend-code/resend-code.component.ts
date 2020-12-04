import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-resend-code',
  templateUrl: './resend-code.component.html',
  styleUrls: ['./resend-code.component.scss']
})
export class ResendCodeComponent implements OnInit {

  constructor(
    private authservice:AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authservice.resendCode()
    .subscribe(
      res=>{
        if(res.estado=='Hecho'){
          Swal.fire("Codigo reenviado", "Revise su correo para activar su cuenta", "success");
          this.router.navigate(['/verification']);
        }else{
          Swal.fire("Error", "Hubo un error al intentar enviar su codigo, verifique si está logueado correctamente", "warning");
            this.router.navigate(['/verification']);
        }
      },
      err=>{
        Swal.fire("Error", "Hubo un fallo en el sistema, por favor intente de nuevo", "warning");
            this.router.navigate(['/verification']);
      }
    )
  }

}
