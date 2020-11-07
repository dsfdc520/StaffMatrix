import { LightningElement, track, api, wire } from 'lwc';
import getEmployees from '@salesforce/apex/EmployeeSearchFormController.getEmployees';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EmployeeSearchResult extends LightningElement {
    @api departmentId;
    @track employees;

    @wire(getEmployees, {departmentId : '$departmentId'})
    wiredEmployees({data,error}){
        if(data){
            this.employees = data;
        } else if(error){
        this.showToast('ERROR', error.body.message, 'error');
        }
    }
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    get employeesFound(){
        if(this.employees){
            return true;
        }
        return false;
    }
}