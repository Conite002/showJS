class Creator{
	static createChart(props){
       if(props.type == "line")
          return LineChartCreator.createChart(props);  
       else if(props.type == "pie")
          return PieChartCreator.createChart(props);
    }
}

// export default Creator;