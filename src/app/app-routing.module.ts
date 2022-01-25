import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path : '',
      component : HeaderComponent,
      children:[
        {
          path : '',
            component : RegisterComponent, 
            
        },
        {
          path : 'Bitacora',
            component : BitacoraComponent, 
            
        },

      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
