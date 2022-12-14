import {LineChartCreator} from './lineChartCreator.js';

export class Creator{
	static createChart(type, props){
       if(type == "line"){
          return LineChartCreator.createChart(props);  
       }
       else if(type == "pie"){
          return PieChartCreator.createChart(props);
       }
       else{
         console.log("draw nothing");
       }
   }
}