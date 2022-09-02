import { Component } from './components.js';

export class Diagram{
    constructor(props = {} ,type = "", data = {}, options ){
        this.props = props;
        this.legend = data.legends;
        this.datasets = data.datasets;
        this.options = options;
        this.components = [];
        this.addLegend();
        this.drawComponent();
        this.draw();
    }
    addLegend(){

        let i = 0, rects = [], pos = this.props.pos, dim = this.props.dim, dx = 30, dy = 30, dw = 30, dh = 15, 
            step = (dim.width / this.legend.values.length), axisX = this.props.axis.x, axisY = this.props.axis.y;

        if(this.legend.axis == "x"){
            for(i = 0; i < this.legend.values.length; i++){
                rects[i] = aya.Component("rectangle", {x : pos.x + dx + (step*i), y : pos.y - dim.height - dy, width : dw, height : dh} );
                let text = aya.Text(pos.x + dx + (step*i), pos.y - dim.height - dy - dh, this.legend.values[i])
                // rects[i].addChild(text, (p, c) =>{}, null, true);
                axisY.addChild(text, (p, c) =>{}, null, true);
                    console.log(rects)
                rects[i].form.vertex.forEach(cp =>{
                    cp.removeFromDOM();
                });
                rects[i].form.c_points.forEach(cp =>{
                    cp.removeFromDOM();
                });
                this.setOptions(rects, this.options);

            }
        }
        if (this.legend.axis == "y") {
            for(i = 0; i < this.legend.values.length; i++){
                rects[i] = aya.Component("rectangle", {x : pos.x + dx + dim.width , y : pos.y - dim.height - dy + (step*i), width : dw, height : dh} );
                rects[i].form.c_points = [];
                rects[i].form.vertex = [];
                let text = aya.Text(pos.x + (dx*3) + dim.width, pos.y - dim.height - dh + (step*i), this.legend.values[i])
                // rects[i].addChild(text, (p, c) =>{}, null, true);
                axisY.addChild(text, (p, c) =>{}, null, true);
                this.setOptions(rects, this.options);
            }
        }
    }

    drawComponent(){
        let axisX = this.props.axis.x, axisY = this.props.axis.y, i = 0, stepX = this.props.dim.width / (axisX.children.length + 1),
         marginX =((this.props.dim.width / axisX.children.length) - (stepX))/2, datas = this.datasets.data;
        console.log(axisX.children.length)
        for (i = 0; i < (axisX.children.length); i++) {
            if( i != (axisX.children.length - 1)){
                this.components[i] = aya.Component("rectangle", {x : (axisX.children[i].child.x + marginX), y :  (axisX.children[i].child.y - datas[i]), width : (axisX.children[i+1].child.x - axisX.children[i].child.x - (marginX*2)) , height : datas[i] });
                console.log(this.components[i].form)
                this.components[i].form.vertex.forEach(cp =>{
                    cp.removeFromDOM();
                });
                this.components[i].form.c_points.forEach(cp =>{
                    cp.removeFromDOM();
                });
                this.setOptions(this.components, this.options)

            }
        }
    }

    setOptions(components, options){
        let i = 0;
        for(i = 0; i < components.length; i++){
            components[i].form.c_svg.setAttribute("fill",options.backgroundColor[i]);
            components[i].form.c_svg.setAttribute("stroke",options.borderColor[i]);
            components[i].form.c_svg.setAttribute("stroke-width",options.borderWidth[i]);
            
        }
    }

    draw(){
    }
}
