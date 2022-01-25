import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  url='http://localhost/Taller/'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }


  altaDatos(arti){
    console.log( JSON.stringify(arti))
    return this.http.post(`${this.url}altaClient.php`, JSON.stringify(arti));
  }

  recuperarTodosEmpre() {
    return this.http.get(`${this.url}recuperarClient.php`);
  }

  buscar(id) {
    return this.http.get(`${this.url}buscar.php?nombre=${id}`); 
  }

}
