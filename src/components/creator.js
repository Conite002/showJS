import {LineChartCreator} from './lineChartCreator.js';

export class Creator{
	static createChart(props){
       if(props.type == "line"){
         console.log("draw line")
          return LineChartCreator.createChart(props);  
       }
       else if(props.type == "pie"){
          console.log("draw line")
          return PieChartCreator.createChart(props);
       }
       else{
         console.log("draw nothing");
         console.log(props)
       }
   }
}