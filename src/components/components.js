import { Creator } from "./creator.js";


export class Component{
    constructor(name="name of component", type = "", props={}){
        this.id =1;
        this.name = name;
        this.props = props;
        this.type = type;
        this.form = Creator.createChart(this.type, this.props);
        this.draw();
        console.log(this)
    }

    draw(){
    }
}