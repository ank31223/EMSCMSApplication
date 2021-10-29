import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientsService } from '../clients.service';
import { Employee } from '../employee';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientList:Client[];
  newClient:Client=new Client();
  editClient:Client=new Client();
  deleteClient:Client=new Client();
  notAssignableEmployees:Employee[]=[];
  assignableEmployees:Employee[]=[];
  editIndex:number;
  deleteIndex:number;
  currentClient:Client=new Client();
  currentClientId:string;
  currentClientName:string;
  addIndex:number;
  removeIndex:number;

  constructor(private clientService:ClientsService) { }

  ngOnInit(){

    this.clientService.getAllClients().subscribe(
      (response: Client[]) => {
        this.clientList = response;
      },
      (err) => {
        console.log("this is error");
        console.log(err);
      }

    );
  }

  onSaveClick() {
    this.clientService.addClient(this.newClient).subscribe(
      (response) => {
        this.clientList.push(response);
        this.newClient.clientId = null;
        this.newClient.clientName = null
        this.newClient.clientAddress = null;
       
      },
      (error) => {

      }
    );
  }

  onEditClick(event,i:number){
    this.editClient.clientId=this.clientList[i].clientId;
    this.editClient.clientName=this.clientList[i].clientName;
    this.editClient.clientAddress=this.clientList[i].clientAddress;
    this.editIndex = i;
  }

  onUpdateClick(){
    this.clientService.updateClient(this.editClient).subscribe(
      (response) => {

        var c:Client=new Client();
        c.clientId = this.editClient.clientId;
        c.clientName = this.editClient.clientName;
        c.clientAddress=this.editClient.clientAddress;
       

        this.clientList[this.editIndex] = c;

        this.editClient.clientId = null;
        this.editClient.clientName = null;
        this.editClient.clientAddress = null;

      },
      (error) => {
        console.log(error);

      }
    )

  }

  onDeleteClick(event, i: number) {
    this.deleteIndex = i;
    this.deleteClient.clientId=this.clientList[i].clientId;
    this.deleteClient.clientName=this.clientList[i].clientName;
    this.deleteClient.clientAddress=this.clientList[i].clientAddress;
    
  }

  onDeleteConfirmClick(){

    this.clientService.deleteClient(this.deleteClient.clientId).subscribe(
      (response) => {
        this.clientList.splice(this.deleteIndex, 1);
        this.deleteClient.clientId = null;
        this.deleteClient.clientName = null;
        this.deleteClient.clientAddress = null;

      },
      (error) => {

      }
    );
  }

  onViewClientClick(event,i:number){
    this.currentClientId=this.clientList[i].clientId;
    this.currentClientName=this.clientList[i].clientName;

    this.clientService.getClientEmployees(this.currentClientId).subscribe(
      (response)=>{
        this.assignableEmployees=response.assignableEmployees;
        this.notAssignableEmployees=response.notAssignableEmployees;
      },
      (error)=>{
      }
    )
  }

  onAddClick(event,i:number){
    this.addIndex=i;
    this.clientService.addEmployeeToClient(this.currentClientId,this.assignableEmployees[i].employeeId).subscribe(
      (response)=>{
        this.notAssignableEmployees.push(this.assignableEmployees[this.addIndex]);
        this.assignableEmployees.splice(this.addIndex,1);
      },
      (error)=>{

      }
    );
  }

   onRemoveClick(event,i:number){
    this.removeIndex=i;
    
    this.clientService.removeEmployeeFromClient(this.currentClientId,this.notAssignableEmployees[i].employeeId).subscribe(
      (response)=>{
        this.assignableEmployees.push(this.notAssignableEmployees[this.removeIndex]);
        this.notAssignableEmployees.splice(this.removeIndex,1);
      },
      (error)=>{

      }
    );
  }

}
