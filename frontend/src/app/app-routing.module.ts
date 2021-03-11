import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { AuthGuard } from "./guards/auth.guard";
import { RecPasswordComponent } from "./components/rec-password/rec-password.component";


const routes: Routes = [
 
  {
    path: 'rec-password',
    component: RecPasswordComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
