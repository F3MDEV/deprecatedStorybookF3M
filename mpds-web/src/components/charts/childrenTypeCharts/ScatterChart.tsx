import React, { useEffect, useRef, useState } from "react";

//OUTSIDE COMPONENTS
import Chartjs from "chart.js";
import {PluginServiceRegistrationOptions, ChartColor, Scriptable, ChartPoint, ChartTooltipCallback, ChartLegendLabelItem, ChartData } from "chart.js";
import moment from 'moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb'

//TYPES IMPORTS
import { LineChartProps as LineProps} from "./LineChart"

export interface ScatterChartProps extends LineProps{
	pluginOfChart?: PluginServiceRegistrationOptions[]
}

const ScatterChart = ({ pluginOfChart, 
	firstLabelData, 
	firstBorderColorData, 
	firstBackgroundColorData,
	firstData,
	secondLabelData,
	secondBorderColorData,
	secondBackgroundColorData,
	secondData,
	thirdLabelData,
	thirdBorderColorData,
	thirdBackgroundColorData,
	thirdData,
	fourthLabelData,
	fourthBorderColorData,
	fourthBackgroundColorData,
	fourthData,
	fifthLabelData,
	fifthBorderColorData,
	fifthBackgroundColorData,
	fifthData,
	legendDisplay,
	tooltipCallback,
	dateFrom,
	dateTo,
	yAxesTicksMin,
	yAxesTicksMax,
	yAxesTicksCallback,
	hidden = false,
 }: ScatterChartProps) => {
	// initialise with null, but tell TypeScript we are looking for an HTMLCanvasElement
	const chartContainer = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>();

	useEffect(() => {
		let language: string;
		language = localStorage.getItem("i18nextLng") || "pt";
        if (language.length > 2) {
            language = language.substr(0, 2).toUpperCase();
		}
		moment.locale(language)

		const chartConfig = {
			type: 'scatter',
			maintainAspectRatio:false,
			data: {
			  x: new Date(),
			  datasets: [{
				label: firstLabelData as string,
				fill: false,
				lineTension: 0.2,
				borderColor: firstBorderColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				backgroundColor: firstBackgroundColorData as  ChartColor | ChartColor[] | Scriptable<ChartColor>,
				borderWidth: 1,
				pointHitRadius: 10,
				data: firstData as Array<number | null | undefined> | ChartPoint[]
			  },
			  {
				label: secondLabelData as string,
				fill: false,
				lineTension: 0.2,
				borderColor: secondBorderColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				backgroundColor: secondBackgroundColorData as  ChartColor | ChartColor[] | Scriptable<ChartColor>,
				borderWidth: 1,
				pointHitRadius: 10,
				data:  secondData as Array<number | null | undefined> | ChartPoint[]
			  },
			  {
				label: thirdLabelData as string,
				fill: false,
				lineTension: 0.2,
				borderColor: thirdBorderColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				backgroundColor: thirdBackgroundColorData as  ChartColor | ChartColor[] | Scriptable<ChartColor>,
				borderWidth: 1,
				pointHitRadius: 10,
				data: thirdData as Array<number | null | undefined> | ChartPoint[]
			  },
			  {
				label: fourthLabelData as string,
				fill: false,
				lineTension: 0.2,
				borderColor: fourthBorderColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				backgroundColor: fourthBackgroundColorData as  ChartColor | ChartColor[] | Scriptable<ChartColor>,
				borderWidth: 1,
				pointHitRadius: 10,
				data: fourthData as Array<number | null | undefined> | ChartPoint[]
				},
				{
				label: fifthLabelData as string,
				fill: false,
				lineTension: 0.2,
				borderColor: fifthBorderColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				backgroundColor: fifthBackgroundColorData as  ChartColor | ChartColor[] | Scriptable<ChartColor>,
				borderWidth: 1,
				pointHitRadius: 10,
				data: fifthData as Array<number | null | undefined> | ChartPoint[]
				},
				]
			},
			options: {
			legend: {
				display: legendDisplay as boolean,
				position: 'bottom' as "bottom" | "left" | "right" | "top" | "chartArea" | undefined,
				labels: {
					fontSize: 10,
					boxWidth: 20,
					filter: function(item: ChartLegendLabelItem, chart: ChartData) {
						if(item.text != undefined){
							return !item.text.includes('null');
						}	
					}
				}
			},
			tooltips: {
				mode: 'index' as "label" | "index" | "x" | "point" | "nearest" | "single" | "x-axis" | "dataset" | "y" | undefined,
				callbacks: tooltipCallback as ChartTooltipCallback,
				footerFontStyle: 'normal'
			  }, 
			pan: {
			  enabled: true,
			  mode: 'x',     
			},
			zoom: {
			  enabled: true,         
			  mode: 'x'  
			},
			responsive: true,
			  events: ['click'],
			  scales: {
				xAxes: [{
					type: 'time',
					ticks: {
					  autoSkip: true,
					  maxTicksLimit: 20
					},
					time: {
					  parse: 'DD/MM/YYYY',
					  tooltipFormat: 'DD MMM',
					  displayFormats: {
						'day': 'DD MMM',
						'minute': 'DD MMM',
						'hour': 'DD MMM',
					 },
					  unit: 'day' as "day" | "millisecond" | "second" | "minute" | "hour" | "week" | "month" | "quarter" | "year" | undefined,
					  min:  dateFrom as string, 
					  max:  dateTo as string 
					} 
				  }],
				  yAxes: [{
					 ticks: {
						 min: yAxesTicksMin as number,//-0.1,
						 max: yAxesTicksMax as number,
						 stepSize: 1,
						 callback: yAxesTicksCallback as (value: number | string, index: number, values: number[] | string[]) => string | number | null | undefined,		
						},  
					  scaleLabel: {
						 show: true,
						 labelString: 'Value'        
					   }
				  }]
				 }, 
			},
        	plugins: pluginOfChart as PluginServiceRegistrationOptions[],
		};
		// strict null checks need us to check if chartContainer and current exist.
		// but once current exists, it is of type HTMLCanvasElement
		if (chartContainer && chartContainer.current) {
			const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
			setChartInstance(newChartInstance);
		}
	}, [dateTo, dateFrom]);

	return (
		<React.Fragment>
			<canvas hidden={hidden} ref={chartContainer} className="chart"/>
		</React.Fragment>
	);
};

export default ScatterChart;