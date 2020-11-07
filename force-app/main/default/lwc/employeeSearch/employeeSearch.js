import { LightningElement, track } from 'lwc';

export default class EmployeeSearch extends LightningElement {
    @track departmentId;
    departmentSelectHandler(event){
        this.departmentId = event.detail;
    }
}