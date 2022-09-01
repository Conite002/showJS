
export class Landmark{
    constructor(position = { x : 0, y : 0 } , dimension = { width : 0, height : 0 }, prop = {}, display_graduations = { x : true, y : true }){
        this.position = position;
        this.dimension = dimension;
        this.display_graduations = display_graduations;
        this.minStep = this.findMinStep(prop);
        this.y_pas = this.create_y_pas(prop);
        this.x_pas = this.create_x_pas(prop);
        this.axis =  this.create_axis(prop);
    }

    findMinStep(prop){
        var minStepX , minStepY;
        if(prop.x){ 
            if(typeof prop[prop.x][0] == "string")
                minStepX = this.dimension.width / prop[prop.x].length;
            else
                minStepX = 1;
        }
        else{
            var key;
            Object.keys(prop).map((v, index) =>{
                if(index == 0)
                    key = v; 
            });
            if(typeof prop[key][0] == "string")
                minStepX = this.dimension.width / prop[key].length;
            else
                minStepX = 1;
        }
        if(prop.y ){ 
            if(typeof prop[prop.y][0] == "string")
                minStepY = this.dimension.height / prop[prop.y].length;
            else
                minStepY = 1;
        }
        else{
            var key;
            Object.keys(prop).map((v, index) =>{
                if(index == 1)
                    key = v; 
            });
            if(typeof prop[key][0] == "string")
                minStepY = this.dimension.height / prop[key].length;
            else
                minStepY = 1;
        }
        return { x : minStepX, y : minStepY }
    }

    create_axis(prop){
        var key_x, key_y, cpt = 0, p = 0.06, x_axis, y_axis;
        Object.keys(prop).map((v, index) =>{
            if(index == 0)
                key_x = v;
            if(index == 1)
                key_y = v;
        });

        x_axis = aya.Polyline([this.position.x, this.position.y, this.position.x + this.dimension.width, this.position.y]);
        y_axis = aya.Polyline([this.position.x, this.position.y, this.position.x, this.position.y - this.dimension.height]);
        if(this.display_graduations.x){
            for(var i = 0; i < this.x_pas.length; i++){
                var pl = aya.Polyline([this.x_pas[i], this.position.y - 3, this.x_pas[i], this.position.y + 3]);
                if(prop.x)
                    var text = aya.Text(this.x_pas[i] - prop[prop.x][i].length*5, this.position.y + 15,  prop[prop.x][i]);
                else
                    var text = aya.Text(this.x_pas[i] - prop[key_x][i].length*5, this.position.y + 15,  prop[key_x][i]);
                //var pl = aya.Polyline([0, 0, 0, 0]);
                pl.addChild(text, (p,c)=>{},null, true);
                x_axis.addChild(pl, (p,c) =>{}, null, true);
            }
        }
        if(this.display_graduations.y){
            for(var i = 0; i < this.y_pas.length; i++){
                var pc = aya.Polyline([this.position.x -3, this.y_pas[i], this.position.x + 3, this.y_pas[i]]);
                if(prop.y)
                    var text = aya.Text(this.position.x - Math.floor(prop[prop.y][i].length /(2*p )) -15, this.y_pas[i], prop[prop.y][i]);
                else
                    var text = aya.Text(this.position.x - Math.floor(prop[key_y][i].length /(2*p)) -15, this.y_pas[i], prop[key_y][i]);
                pc.addChild(text, null, null, true);
                y_axis.addChild(pc, (p,c) =>{}, null, true);
            }
        }
        for(var m of x_axis.children){
            if((m.child.children[0].child.x + m.child.children[0].child.text.length) >= Math.abs(this.x_pas[0] - this.x_pas[1])){
               console.log(m.child.children[0].child);
                cpt++;
                break;
            }
        }
        if(cpt){
            x_axis.children.map(({child}, index) =>{
                var text = child.children[0].child;
                if(prop.x)
                    text.x = this.x_pas[index] - prop[prop.x][index].length*7;
                else
                    text.x = this.x_pas[index] - prop[key_x][index].length*7;
                text.y = this.position.y + text.text.length / (2*p);
                text.setRotateAngle(-45);
                text.setRotateCenter(text.x, text.y);
                text.redraw();
            });
        }

        x_axis.draw();
        y_axis.draw();

        return { x : x_axis, y : y_axis };
    }

    create_y_pas(prop){
        var i, y, tmp, key, y_pas = [];
        if(prop.y){
            if(typeof prop[prop.y][0] == "string"){
                for( i = 0; i < this.dimension.height/prop[prop.y].length; i++){
                    y_pas[i] = this.position.y - i*this.minStep.y;
                }
            }
            else{
                tmp = this.dimension.height / 2;
                while(tmp > this.minStep.y ){ 
                    tmp = tmp / 2;
                }
                tmp = tmp*2;
                y = this.position.y;
                for(i = 0; i < (this.dimension.height/tmp); i++){
                    y_pas[i] = y;
                    y -= tmp;
                }
            }
        }
        else{
            Object.keys(prop).map((v, index) =>{
                if(index == 1)
                    key = v;
            });
            if(typeof prop[key][0] == "string")
                for (i = 0; i < this.dimension.height/this.minStep.y; i++)
                    y_pas[i] = this.position.y - i*this.minStep.y;
            else{
                tmp = this.dimension.height/2;
                while(tmp > this.minStep.y)
                    tmp = tmp/2;
                tmp = tmp*2;
                for(i = 0; i < (this.dimension.height/tmp); i++){
                    y_pas[i] = this.position.y - i*tmp;
                }
            }
        }

        return y_pas;
    }

    create_x_pas(prop){
        var i, tmp, key, x_pas = [];
        if( prop.x ){
            if(typeof prop[prop.x][0] == "string")
                for (i = 0; i < this.dimension.width/this.minStep.x; i++)
                    x_pas[i] = this.position.x + i*this.minStep.x;
            else{
                tmp = this.dimension.width/2;
                while(tmp > this.minStep.x)
                    tmp = tmp/2;
                tmp = tmp*2;
                for(i = 0; i < (this.dimension.width/tmp); i++){
                    x_pas[i] = this.position.x + i*tmp;
                }
            } 
        }
        else{
            Object.keys(prop).map((v, index) =>{
                if(index == 0)
                    key = v;
            });
            if(typeof prop[key][0] == "string")
                for (i = 0; i < this.dimension.width/this.minStep.x; i++)
                    x_pas[i] = this.position.x + i*this.minStep.x;
            else{
                tmp = this.dimension.width/2;
                while(tmp > this.minStep.x)
                    tmp = tmp/2;
                tmp = tmp*2;
                for(i = 0; i < (this.dimension.width/tmp); i++){
                    x_pas[i] = this.position.x + i*tmp;
                }
            }
           
        }

        return x_pas;
    }
}
