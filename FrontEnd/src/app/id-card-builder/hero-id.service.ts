import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class HeroIDService {

  constructor(private http :HttpClient) { }

  server_address: String = 'http://localhost:5000'

//to insert details for ID card
  IdInput(item: any) {
    return this.http.post(`${this.server_address}/id/id_insert`,item)
  }


// to get the id application details for pdf generation
  getIdCard(){
    return this.http.get(`${this.server_address}/id/id_access`)
  }

// to get the id application details for edit/delete purpose
  getApplication(){
    return this.http.get(`${this.server_address}/id/id_access`)
  }

  downloadPDF(){
    return this.http.get(`${this.server_address}/id/downloadPDF`,{responseType: 'blob'})
  }


}
