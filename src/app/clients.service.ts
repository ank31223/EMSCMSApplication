import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';
import { ClientEmployeesResponse } from './client-employees-response';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url:string="http://localhost:8080";

  constructor(private httpClient:HttpClient) { }

  getAllClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.url+"/getAllClients");
  }

  addClient(client:Client):Observable<Client>{
    return this.httpClient.post<Client>(this.url+"/addClient",client);
  }

  updateClient(client:Client):Observable<Client>{
    return this.httpClient.put<Client>(this.url+"/updateClient",client);
  }

  deleteClient(clientId:string):Observable<any>{
    return this.httpClient.delete<any>(this.url+"/deleteClient/"+clientId);
  }

  getClientEmployees(clientId:string):Observable<ClientEmployeesResponse>{
    return this.httpClient.get<ClientEmployeesResponse>(this.url+"/clientEmployees/"+clientId);
  }

  addEmployeeToClient(clientId:string,employeeId:string):Observable<any>{
    return this.httpClient.get<any>(this.url+"/addEmployeeToClient/"+clientId+"/"+employeeId);
  }

  removeEmployeeFromClient(clientId:string,employeeId:string):Observable<any>{
     return this.httpClient.get<any>(this.url+"/removeEmployeeFromClient/"+clientId+"/"+employeeId);
  }
}
