import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    dynamicGreeting = 'World from JS Component';

    changeHandler(event){
        this.dynamicGreeting = event.target.value;
    }
}