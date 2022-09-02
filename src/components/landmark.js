import { Diagram } from './diagram.js';

export class Landmark{
    constructor(position = { x : 0, y : 0 } , dimension = { width : 0, height : 0 }, prop = { type : "bar", data : {}, options : {} }, display_graduations = { x : true, y : true }){
        this.position = position;
        this.dimension = dimension;
        this.display_graduations = display_graduations;
        this.stepAndPos = this.findStepAndPos(prop);
        this.axis =  this.draw_axis(prop);
        this.diagram = new Diagram({pos : this.position, dim : this.dimension, axis : this.axis}, prop.type, prop.data, prop.options);
    }

    findStepAndPos(prop){
        let labels = prop.data.labels, minStepX , minStepY, stepX = [], stepY = [],
         axis = prop.data.datasets.axis, i = 0, data = prop.data.datasets.data;
        minStepX = this.dimension.width / labels.length;
        minStepY = this.dimension.height / data.length;

        for(i = 0; i <= labels.length; i++)
            stepX[i] = this.position.x + (i*minStepX);
        for(i = 0; i <= data.length; i++)
            stepY[i] = this.position.y - (i*minStepY);
        return { x : minStepX, y : minStepY, posStepX : stepX, posStepY : stepY }
    }

    draw_axis(prop){
        let x_axis, y_axis, poly = { x : [], y : []}, i = 0, stepX = this.stepAndPos.posStepX,
         stepY = this.stepAndPos.posStepY, labels = prop.data.labels, data = prop.data.datasets.data.sort(), dx_text, dy_text;
        x_axis = aya.Polyline([this.position.x, this.position.y, this.position.x + this.dimension.width, this.position.y]);
        y_axis = aya.Polyline([this.position.x, this.position.y, this.position.x, this.position.y + (Math.max(data))]);
        // y_axis = aya.Polyline([this.position.x, this.position.y, this.position.x, this.position.y - this.dimension.height]);

        if(this.display_graduations.x){
            dx_text = 20; dy_text = dy_text = 15
            for( i = 0; i < stepX.length; i++ ){
                poly.x[i] = aya.Polyline([ stepX[i], this.position.y, stepX[i], this.position.y - this.dimension.height ])
                let text = aya.Text(stepX[i] + dx_text, this.position.y + dy_text, labels[i]);
                if( i != (stepX.length-1)){
                    poly.x[i].addChild(text, (p,c)=>{},null, true);
                }
                x_axis.addChild(poly.x[i], (p,c)=>{}, null, true);
            }
        }
        if(this.display_graduations.y){
            dx_text = 40, dy_text = 15, data.sort();
            for( i = 0; i < stepY.length; i++ ){
                poly.y[i] = aya.Polyline([ this.position.x, stepY[i], this.position.x + this.dimension.width, stepY[i] ])
                let text = aya.Text(this.position.x - dx_text, stepY[i] - dy_text, data[i]);
                if( i != (stepY.length - 1) )
                    poly.y[i].addChild(text, (p,c)=>{},null, true);
                y_axis.addChild(poly.y[i], (p,c)=>{}, null, true);
            }

        }
        x_axis.draw();
        y_axis.draw();
        return { x : x_axis, y : y_axis };
    }
    redraw(){
        let stepX = this.stepAndPos.posStepX, stepY = this.stepAndPos.posStepY,
         labels = prop.data.labels, data = prop.data.datasets.data;
         if(this.display_graduations.x){

         }
         if(this.display_graduations.y){

         }
    }
}
