import { Employee } from "./employee"
import { EmployeeComponent } from "./employee/employee.component";

export class ClientEmployeesResponse {
    assignableEmployees:Employee[]=[];
    notAssignableEmployees:Employee[]=[];

    constructor(){
        this.assignableEmployees=[];
        this.notAssignableEmployees=[];
    }
}
