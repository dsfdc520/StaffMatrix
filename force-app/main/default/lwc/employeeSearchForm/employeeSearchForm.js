import { LightningElement, track, wire } from 'lwc';
import getDepartments from '@salesforce/apex/EmployeeSearchFormController.getDepartments';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class EmployeeSearchForm extends NavigationMixin(LightningElement) {
    @track Departments;

    @wire(getDepartments)
    wiredCarType({data, error}){
        if(data){
            //this.Departments = [{value:'', label:'Technology'}];
            this.Departments = [];
            data.forEach(element => {
                const department = {};
                department.label = element.Name;
                department.value = element.Id;
                this.Departments.push(department);
            });
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    handleDepartmentChange(event){
        const departmentId = event.detail.value;

        const departmentSelectionChangeEvent = new CustomEvent('departmentselect', {detail : departmentId});
        this.dispatchEvent(departmentSelectionChangeEvent);
    }

    createNewDepartment(){

        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName : 'Department__c',
                actionName : 'new'
            }
        });

    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }


}