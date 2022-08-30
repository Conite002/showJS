import {Landmark}  from "./src/components/landmark.js";
const xlog = "ok log";
export {xlog};
let x = new Landmark(
		{ 
			x : 50, 
			y : 100 
		}, 
		{ 
			width : 100, 
			height : 100 
		}, 
		{
			type : "line", 
			labels_x : [], 
			labels_y : [], 
			legends : {} 
		}
	);


