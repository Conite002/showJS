import { Creator } from "./creator.js";


export class Component{
    constructor(name="name of component", props={}){
        this.id =1;
        this.name = name;
        this.type = props.type;
        this.props = props;
        this.form = Creator.createChart(this.type,this.props);
        this.draw();
    }

    draw(){
        console.log("Draw components");
    }
}