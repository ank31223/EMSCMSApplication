import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeList: Employee[];
  newEmployee: Employee = new Employee();
  editEmployee: Employee = new Employee();
  editIndex: number;
  deleteEmployee: Employee = new Employee();
  deleteIndex: number;
  currentEmployeeId:string;
  assignableClients:Client[]=[];
  notAssignableClients:Client[]=[];
  currentEmployeeName:string;
  addIndex:number;
  removeIndex:number;

  constructor(private employeeService: EmployeesService) { }

  ngOnInit() {

    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employeeList = response;
      },
      (err) => {
        console.log("this is error");
        console.log(err);
      }

    );

  }
  onSaveClick() {
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      (response) => {
        this.employeeList.push(response);
        this.newEmployee.employeeId = null;
        this.newEmployee.employeeAge = null
        this.newEmployee.employeeName = null;
        this.newEmployee.employeeGender = null;
        this.newEmployee.employeeEmail = null;
      },
      (error) => {

      }
    );

  }

  onEditClick(event, i: number) {
    this.editEmployee.employeeId=this.employeeList[i].employeeId;
    this.editEmployee.employeeName=this.employeeList[i].employeeName;
    this.editEmployee.employeeGender=this.employeeList[i].employeeGender;
    this.editEmployee.employeeAge=this.employeeList[i].employeeAge;
    this.editEmployee.employeeEmail=this.employeeList[i].employeeEmail;
    this.editIndex = i;
  }
  onUpdateClick() {
    this.employeeService.updateEmployee(this.editEmployee).subscribe(
      (response) => {
        console.log(this.editIndex);

        var e: Employee = new Employee();
        e.employeeId = this.editEmployee.employeeId;
        e.employeeName = this.editEmployee.employeeName;
        e.employeeGender = this.editEmployee.employeeGender;
        e.employeeAge = this.editEmployee.employeeAge;
        e.employeeEmail = this.editEmployee.employeeEmail;

        this.employeeList[this.editIndex] = e;

        this.editEmployee.employeeId = null;
        this.editEmployee.employeeName = null;
        this.editEmployee.employeeGender = null;
        this.editEmployee.employeeAge = null;
        this.editEmployee.employeeEmail = null;

      },
      (error) => {
        console.log(error);

      }
    )
  }

  onDeleteClick(event, i: number) {
    this.deleteIndex = i;
    this.deleteEmployee.employeeId=this.employeeList[i].employeeId;
    this.deleteEmployee.employeeName=this.employeeList[i].employeeName;
    this.deleteEmployee.employeeGender=this.employeeList[i].employeeGender;
    this.deleteEmployee.employeeAge=this.employeeList[i].employeeAge;
    this.deleteEmployee.employeeEmail=this.employeeList[i].employeeEmail;
  }

  onDeleteConfirmClick() {
    this.employeeService.deleteEmployee(this.deleteEmployee.employeeId).subscribe(
      (response) => {
        this.employeeList.splice(this.deleteIndex, 1);
        console.log("user deleted successfully");
        this.deleteEmployee.employeeId = null;
        this.deleteEmployee.employeeName = null;
        this.deleteEmployee.employeeGender = null;
        this.deleteEmployee.employeeAge = 0;
        this.deleteEmployee.employeeEmail = null;

      },
      (error) => {

      }
    );
  }

  onViewClientClick(event,i:number){
    this.currentEmployeeId=this.employeeList[i].employeeId;
    this.currentEmployeeName=this.employeeList[i].employeeName;
    this.employeeService.getEmployeeClients(this.currentEmployeeId).subscribe(
      (response)=>{
        this.assignableClients=response.assignableClientsList;
        this.notAssignableClients=response.notAssignableClientList;
        
      },
      (error)=>{
      }
    )
  }

  onAddClick(event,i:number){
    this.addIndex=i;
    this.employeeService.addClientToEmployee(this.currentEmployeeId,this.assignableClients[i].clientId).subscribe(
      (response)=>{
        this.notAssignableClients.push(this.assignableClients[this.addIndex]);
        this.assignableClients.splice(this.addIndex,1);
      },
      (error)=>{

      }
    );
  }

  onRemoveClick(event,i:number){
    this.removeIndex=i;
    
    this.employeeService.removeClientFromEmployee(this.currentEmployeeId,this.notAssignableClients[i].clientId).subscribe(
      (response)=>{
        this.assignableClients.push(this.notAssignableClients[this.removeIndex]);
        this.notAssignableClients.splice(this.removeIndex,1);
      },
      (error)=>{

      }
    );
  }

}
