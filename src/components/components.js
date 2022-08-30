import { Creator } from "./creator.js";


export class Component{
    constructor(name="name of component", props={}){
        this.id =1;
        this.name = name;
        this.props = props;
        this.form = Creator.createChart(this.props);
        this.draw();
        console.log("enter to component")      

    }

    draw(){
        console.log("Draw components");
    }
}