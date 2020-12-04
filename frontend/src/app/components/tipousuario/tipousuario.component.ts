import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2/dist/sweetalert2.js";


@Component({
  selector: 'app-tipousuario',
  templateUrl: './tipousuario.component.html',
  styleUrls: ['./tipousuario.component.scss']
})
export class TipousuarioComponent implements OnInit {


  constructor( private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  signIn(){
    this.router.navigate(['/signup']);
  }

}
