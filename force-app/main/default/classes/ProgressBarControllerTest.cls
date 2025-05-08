/**
 * This class contains unit tests of Apex class : ProgressBarController
 */

@isTest

private class ProgressBarControllerTest {

    @isTest
    static void testSaveProgressBarData_Success() {
        
       ProgressBarController.ProgressBarWrapper pbWrap = new ProgressBarController.ProgressBarWrapper();
       pbWrap.firstName = 'Test';
       pbWrap.lastName = 'Record';
       pbWrap.birthdate = System.today();
       pbWrap.emailAddress = 'tr@test.com';
       pbWrap.mobile = '123456';
        
       String jsonString = JSON.Serialize(pbWrap);
       System.debug('JSON String ' + jsonString);
        
       Test.startTest();
       
        // to cover code coverage of constructor
       ProgressBarController emptyConstructor = new ProgressBarController();
        
       List<Id> ids = ProgressBarController.saveProgressBarData(jsonString);
        
       Test.stopTest();
        
       System.assertEquals(1, ids.size());
       
       Progress_Bar__c pb = [SELECT Id, First_Name__c, Last_Name__c, Email_Address__c FROM Progress_Bar__c
                             WHERE id in:ids LIMIT 1];
        
       System.assertEquals('Test', pb.First_Name__c);
       System.assertEquals('Record', pb.Last_Name__c);
       System.assertEquals('tr@test.com', pb.Email_Address__c);
        
    }

    @isTest
    static void testSaveProgressBarData_Error() {
       
       String invalidJsonString = '{ invalid json}';
        
       Test.startTest();
        
            try{
                
                ProgressBarController.saveProgressBarData(invalidJsonString);
                System.assert(false, 'Expected AuraHandledException was not thrown.');
            }
            catch (AuraHandledException ex){
                System.assert(ex.getMessage() != null, 'Exception message should not be null');
            }
       
       Test.stopTest();
     }
}