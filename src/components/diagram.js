import { Component } from './components.js';

export class Diagram{
    constructor(props = {} , legend = {}){
        this.props = props;
        this.legend = legend;
        this.component = new Component("component name",this.props);
        console.log("enter to diagram")      
    }
}

const x = 1000;
export {x};