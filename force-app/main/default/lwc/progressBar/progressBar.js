import { LightningElement,track } from 'lwc';
//import { createRecord } from 'lightning/uiRecordApi';
//import PROGRESSBAR_OBJECT from '@salesforce/schema/Progress_Bar__c';
import saveProgressBarData from '@salesforce/apex/ProgressBarController.saveProgressBarData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProgressBar extends LightningElement {

    @ track progress = 0;
    noOfFields =5;

    progressBarRecord = {
        'firstName' : '',
        'lastName' :'',
        'birthdate' : '',
        'emailAddress' : '',
        'mobile' : ''
    }

    handleChange(event){
        console.log('handle change');
        const field = event.target.name;
        if(field === 'firstName' ){
            this.progressBarRecord.firstName = event.target.value;
        }
        else if(field === 'lastName' ){
            this.progressBarRecord.lastName = event.target.value;
        }
        else if(field === 'birthdate' ){
            this.progressBarRecord.birthdate = event.target.value;
        }
        else if(field === 'emailAddress' ){
            this.progressBarRecord.emailAddress = event.target.value;
        }
        else if(field === 'mobile' ){
            this.progressBarRecord.mobile = event.target.value;
        }
        this.fieldCompleted();
    }

    fieldCompleted(){
        console.log('field');
        var numVal =0;

        if(this.progressBarRecord.firstName!=null &&  this.progressBarRecord.firstName != '' ){
            numVal = numVal +1;
        }

        if(this.progressBarRecord.lastName!=null &&  this.progressBarRecord.lastName != '' ){
            numVal = numVal +1;
        }

        if(this.progressBarRecord.birthdate!=null &&  this.progressBarRecord.birthdate != '' ){
            numVal = numVal +1;
        }

        if(this.progressBarRecord.emailAddress!=null &&  this.progressBarRecord.emailAddress != '' ){
            numVal = numVal +1;
        }

        if(this.progressBarRecord.mobile!=null &&  this.progressBarRecord.mobile != '' ){
            numVal = numVal +1;
        }

        this.handleProgressBar(numVal);
    }

    // Calculate progress bar
    handleProgressBar(numVal){
        console.log('handle bar');
        if(numVal>=1){
            this.progress = numVal* (100/this.noOfFields);
        } else{
            this.progress = 0;
        }

    }

    // On click of Reset button, reset whole form
    handleReset(){
        this.progress = 0;
        this.template.querySelector('form').reset();        
    }

    // Enable submit only when all fields are completed. getter method for form validity

    get enableSubmitButton(){   
        return this.progress < 100;          
    } 

    /* Enable submit only when prrogress is 100
    * On click of Submit Button, submit form and create record in SF
    */
     
    handleSubmit(){

        console.log('ProgressBar record for save => ', JSON.stringify(this.progressBarRecord))

        if(this.progress == 100){

            console.log('OK for submit');

            //Imperative Apex Method invocation            
            
            saveProgressBarData({
                progressBarWrapper:JSON.stringify(this.progressBarRecord)
            }).then((result) =>{
                //In result we are getting record id
                console.log('Data:'+ JSON.stringify(result));

                /* Toast event do not support opening record in same tab. 
                   So to open create record in new tab, use window.open
                */
                // window.open('/' + result, '_blank')

                const evt = new ShowToastEvent({
                    title:'Success',
                    //message:'Record Created ' + result,                    
                    message: 'Record Created {0}',
                    messageData: [
                        {
                            url: '/' + result,
                            label: 'Click here to view it'
                        }
                    ],
                    variant:'success'
                });
                this.dispatchEvent(evt);
                this.handleReset();

            }).catch((error)=>{
                console.log(error);
                const evt = new ShowToastEvent({
                    title:'Error',
                    message:error.body.message,
                    variant:'error',
                });
                this.dispatchEvent(evt);
                
            })
        }else{
            console.log('Not OK for submit');
            const evt = new ShowToastEvent({
                title:'Error',
                message:'Please fill all the fields.',
                variant:'error',
            });
            this.dispatchEvent(evt);
        }
    }
        
     
}