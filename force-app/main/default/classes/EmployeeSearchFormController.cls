public with sharing class EmployeeSearchFormController {
    
    //This method gets all the departments from server
    @AuraEnabled(cacheable=true)
    public static List<Department__c> getDepartments(){
        return [SELECT Id, Name FROM Department__c];
    }

    //This method gets employees for the selected department from server
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployees(String departmentId){
        if(String.isEmpty(departmentId)){
            return [SELECT Id, Name, First_Name__c, Last_Name__c, Employee_ID__c, 
            Department__r.Name, Employer__c FROM Employee__c];
        } else{
            return [SELECT Id, Name, First_Name__c, Last_Name__c, Employee_ID__c, 
            Department__r.Name, Employer__c FROM Employee__c WHERE Department__c =: departmentId];
        }
        
    }
}