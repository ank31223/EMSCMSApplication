import { Client } from "./client";

export class EmployeeClientsResponse {
    assignableClientsList:Client[]=[];
    notAssignableClientList:Client[]=[];

    constructor(){
        this.assignableClientsList=[];
        this.notAssignableClientList=[];
    }
}
