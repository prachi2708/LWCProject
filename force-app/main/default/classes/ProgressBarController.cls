
/* Apex class for LWC component ProgressBar*/

public with sharing class ProgressBarController {

    // Constructor
    public ProgressBarController() {

    }

    // Wrapper Class
    public class ProgressBarWrapper{
       
        public string firstName{get;set;} 
        public string lastName{get;set;}
        public date birthdate{get;set;}
        public string emailAddress{get;set;}
        public string mobile{get;set;}
    }
    

    @AuraEnabled
    public static List <Id> saveProgressBarData(String progressBarWrapper){

        System.debug('before progressBarWrapperList '+ progressBarWrapper);

        List<Id> ids = new List<Id>();
        
        try {
            ProgressBarWrapper obj = new ProgressBarWrapper();
            obj = (ProgressBarWrapper)System.JSON.deserialize(progressBarWrapper, 	ProgressBarWrapper.class);
            System.debug('Obj ' + obj);

            if(obj!=null) {
                Progress_Bar__c pb=new Progress_Bar__c();
                pb.First_Name__c = obj.firstName;
                pb.Last_Name__c = obj.lastName;
                pb.Birthdate__c = obj.birthdate;
                pb.Email_Address__c = obj.emailAddress;              
                pb.Mobile__c = obj.mobile;                
                insert pb;
                ids.add(pb.id);

            }            

        } catch (Exception e) {

            String errorMsg = e.getMessage();
            String pureErrorMsg = errorMsg.substringAfter('_EXCEPTION,').SubStringBefore(':');
            //pureErrorMsg = pureErrorMsg.Substring(0, (pureErrorMsg.length()-4));
            System.debug('pureErrorMsg' + pureErrorMsg);
            throw new AuraHandledException(pureErrorMsg);
            //throw new AuraHandledException(e.getMessage());
            
        }
        System.debug('id '+ids);
        return ids;
    }
}