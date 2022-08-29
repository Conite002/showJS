import {Diagram} from './diagram.js';

export class Landmark{
	constructor(pos = { x : 0, y : 0 }, dimension = { width : 0, height : 0 }, props = {type : "bar", labels_x : [], labels_y : [], legends : {} }, graduation = {x : true, y : true} ){
		this.positions = pos;
		this.dimension = dimension;
		this.props = props;
		this.legends = props.legends;
		this.display_graduations = graduation;
		this.diagram = new Diagram(this.props, this.legends);
		console.log("landmark sexy Jutsu");
	}
}
