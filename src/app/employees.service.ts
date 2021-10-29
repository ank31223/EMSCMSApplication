import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { EmployeeClientsResponse } from './employee-clients-response';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  url:string="http://localhost:8080";

  constructor(private httpClient:HttpClient,private jwthelperservice:JwtHelperService) {

   }

   getAllEmployees():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.url+"/getAllEmployees",{responseType:"json"});
   }

   addEmployee(newEmployee:Employee):Observable<any>{
     return this.httpClient.post<any>(this.url+"/addEmployee",newEmployee);
   }

   updateEmployee(employee:Employee):Observable<Employee>{
     return this.httpClient.put<Employee>(this.url+"/updateEmployee",employee);
   }

   deleteEmployee(employeeId:string):Observable<any>{
      return this.httpClient.delete<any>(this.url+"/deleteEmployee/"+employeeId);
   }

   getEmployeeClients(employeeId:string):Observable<EmployeeClientsResponse>{
     return this.httpClient.get<EmployeeClientsResponse>(this.url+"/employeeClients/"+employeeId);
   }

   addClientToEmployee(employeeId:string,clientId:string):Observable<any>{
    return this.httpClient.get<any>(this.url+"/addClientToEmployee/"+employeeId+"/"+clientId);
   }

   removeClientFromEmployee(employeeId:string,clientId:string):Observable<any>{
      return this.httpClient.get<any>(this.url+"/removeClientFromEmployee/"+employeeId+"/"+clientId);
   }

   public isAuthenticated():boolean{

    var token=sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token:null;

    if(this.jwthelperservice.isTokenExpired()){
      return false;
    }else{
      true;
    }

   }
}
