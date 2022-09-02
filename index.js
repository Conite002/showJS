import {Landmark}  from "./src/components/landmark.js";
var ld = new Landmark({ x : 100, y : 500}, { width : 300, height :  300}, {
                    type : "bar",
                    data : {
                        labels : ['Lore', 'michel', 'Sarah', 'Paule'],
                        datasets : {
                            axis : "x",
                            label : "My First Datase",
                            data: [65, 250, 150, 81, 78, 89, 98, 45],
                            fill: false
                        },
                        legends : {
                            axis:"x",
                            values:['high', 'medium', 'low', 'very low'],

                        }
                    },
                    options : {
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 205, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                        ],
                        borderWidth: 2
                    }
                },
            );
