import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  art={
    
    nombres:null,
    apellidos:null,
    telefono:null,
    direccion:null,
    moAuto:null,
    placas:null,
    fechaIngreso:null,
    observaciones:null,
  }


  constructor(public service:ServiceService) { }

  ngOnInit() {
  }

  altaDatos() {
    this.service.altaDatos(this.art).subscribe(datos => {
      console.log(this.art)
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
      }
    });
  }
 
}
