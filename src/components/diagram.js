import { Component } from './components.js';

export class Diagram{
    constructor(props = {} ,type = "", legend = {} ){
        this.props = props;
        this.legend = legend;
        this.component = new Component("component name",type,this.props);
    }
}

const x = 1000;
export {x};