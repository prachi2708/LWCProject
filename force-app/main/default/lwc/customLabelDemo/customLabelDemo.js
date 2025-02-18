import { LightningElement } from 'lwc';
import CUSTOM_LABEL_NAME from '@salesforce/label/c.Welcome_User_Message';

export default class CustomLabel extends LightningElement {

    userMessage = CUSTOM_LABEL_NAME;
}
