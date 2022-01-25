import { Component, OnInit } from '@angular/core';
import { BitacoraComponent } from '../bitacora/bitacora.component';
import { ServiceService } from '../Services/service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(protected service:ServiceService) { }

  ngOnInit() {
    this.recuperarTodosEmpre();
  }

  empre:any;
  recuperarTodosEmpre() {
    this.service.recuperarTodosEmpre().subscribe( (result)  =>{this.empre = result, console.log(result)
     });
  }


 
  art={
    id:null,
    nombres:null
  }
  art1={
    id:null,
    nombres:null,
    apellidos:null,
    telefono:null,
    direccion:null,
    moAuto:null,
    placas:null,
    fechaIngreso:null,
    observacion:null,
  }
  public buescar() {
    this.service.buscar(this.art.nombres).subscribe(
      result => {
        if(result!=null){
          this.art1 = result[0],
          Swal.fire({
          title: 'Cliente Encontrado',
          text: "Cliente : "+this.art1.nombres+", "+"Telefono : "+this.art1.telefono
          +", "+"Direccion :"+this.art1.direccion ,
          icon: 'success',
          
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Pfd Generado',
              'Listo Gracias Por consultar',
              this.generatePdf(this.art1)

            )
          }
        })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Momento Dulce',
            text: 'Lo sentimos esa Empresa aun no se Encuentra Registrada!',
            
          })
        }
      }  
      
      );
  }

  ruta:any="http://localhost/Taller/Logo.png";

  
  generatePdf(art1){
    var docDefinition = {
      content: [
        {
          text: '\n\n Taller De Autos V8',
          style: 'header'
        },
        {
          text: [
            {text: '\n\n',},
            {text: '\n\n',},
            
            {text: '\n\n',},
            {text: 'Nombre del Cliente: ', fontSize: 15, bold: true},
            {text: art1.nombres, fontSize: 13},
            {text: '\n\nApellidos: ', fontSize: 15, bold: true},
            {text: art1.apellidos, fontSize: 13},
            {text: '\t\t\t\tNumero De Telefono: ', fontSize: 15, bold: true},
            {text: art1.telefono, fontSize: 13},
            {text: '\n\nDireccion Del Cliente\n', fontSize: 15, bold: true},
            {text: art1.direccion, fontSize: 13, alignment: 'justify'},
            // {
            //   snow: this.ruta,
            //   width: 150, height: 100,alignment: 'justify'
            // },
            {text: '\n\n',},
            {text: '\n\n',},
            {text: '\n\nDATOS DEL VEHICULO\n', fontSize: 15, bold: true},
            //{text: this.art1.proposito, fontSize: 11, alignment: 'justify'},
            {text: '\n\nModelo del Auto\n', fontSize: 15, bold: true},
            {text: art1.moAuto, fontSize: 13, alignment: 'justify'},
            {text: '\n\nPlacas del Vehiculo\n', fontSize: 15, bold: true},
            {text: art1.placas, fontSize: 13, alignment: 'justify'},
            {text: '\n\nMotivo de Entrada del Vehiculo\n', fontSize: 15, bold: true},
            {text: art1.observacion, fontSize: 13, alignment: 'justify'},
            {text: '\n\nFecha de Entrada\n', fontSize: 15, bold: true},
            {text: art1.fechaIngreso, fontSize: 13, alignment: 'justify'},
            {text: '\n\n',},
            {text: '\n\n',},
            {text: '\n\nDueños: Juan carlos lopez pinacho && Luis alejandro santana pinacho \n', fontSize: 15, bold: true},
            // {text: this.art1.participantes, fontSize: 11, alignment: 'justify'},
            {text: '\n\nDireccion : Avenida Central Entre 13 y 14 Poniente Villaflores Chis. Numeros de Contacto 9651211043,9651007782   \n', fontSize: 15, bold: true},
            // {text: this.art1.evidenciaSa, fontSize: 11, alignment: 'justify'},
            // {text: '\n\nEvidencias de entradas\n', fontSize: 15, bold: true},
            // {text: this.art1.evidenciaEn, fontSize: 11, alignment: 'justify'},
          ]
        },
      ],
      styles: {
        header: {
          alignment: "center",
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
   }

}
