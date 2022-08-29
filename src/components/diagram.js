import { Component } from './components.js';

export class Diagram{
    constructor(props = {} , legend = {}){
        this.props = props;
        this.legend = legend;
        this.component = new Component("component name",this.props);        
    }
}

const x = 1000;
export {x};