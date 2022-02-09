import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HeroadminService {

  constructor(private http :HttpClient) { }

  server_address: String = 'http://localhost:5000'


// to get the id application details for pdf generation
get_Application_Admin(){
  return this.http.get(`${this.server_address}/id/id_access_admin`)
}


// to get the id application details for pdf generation
get_Approved_Admin(){
  return this.http.get(`${this.server_address}/id/approved_list`)
}

adminApproved(item:any){
  return this.http.post<any>(`${this.server_address}/id/id_admin_approve`,{item})  

}

adminRejected(item:any){
  return this.http.put<any>(`${this.server_address}/id/id_admin_reject`,{item})  

}



}
