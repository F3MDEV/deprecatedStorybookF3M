import React, { useEffect, useRef, useState } from "react";

//OUTSIDE COMPONENTS
import {Moment} from 'moment';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb'
import Chartjs from "chart.js";
import 'hammerjs';
import {PluginServiceRegistrationOptions, ChartColor, Scriptable, ChartPoint, ChartTooltipCallback, ChartLegendLabelItem, ChartData} from "chart.js";
import zoom from 'chartjs-plugin-zoom';

export interface LineChartProps {
	pluginOfChart?: PluginServiceRegistrationOptions[],
	xAxisData?: number | string | Date | Moment,

	firstLabelData?:string,
	firstBorderColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	firstBackgroundColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	firstData?: Array<number | null | undefined> | ChartPoint[]; 

	secondLabelData?:string,
	secondBorderColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	secondBackgroundColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	secondData?: Array<number | null | undefined> | ChartPoint[];
	
	thirdLabelData?:string,
	thirdBorderColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	thirdBackgroundColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	thirdData?: Array<number | null | undefined> | ChartPoint[]; 

	fourthLabelData?:string,
	fourthBorderColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	fourthBackgroundColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	fourthData?: Array<number | null | undefined> | ChartPoint[]; 

	fifthLabelData?:string,
	fifthBorderColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	fifthBackgroundColorData?: ChartColor | ChartColor[] | Scriptable<ChartColor>,
	fifthData?: Array<number | null | undefined> | ChartPoint[]; 
	
	legendDisplay?:boolean

	dateFrom?:string,
	dateTo?:string,

	tooltipCallback? : ChartTooltipCallback,

	yAxesTicksMin?: number,
	yAxesTicksMax?: number,

	yAxesTicksCallback?: (
		value: string | number,
		index: number,
		values: number[] | string[]
	) => string | number | null | undefined;

	yAxesStepSize?: number
	hidden?:boolean
}

const LineChart = ({ pluginOfChart, 
	xAxisData, 
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
	dateFrom,
	dateTo,
	tooltipCallback,
	yAxesTicksMin,
	yAxesTicksMax,
	yAxesTicksCallback,
	yAxesStepSize = 1,
	hidden = false
	 }: LineChartProps) => {
	// initialise with null, but tell TypeScript we are looking for an HTMLCanvasElement
	const chartContainer = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>();
	const [zoomOn, setZoomOn] = useState(false);
	const chartConfig = {
		type: "line",
		maintainAspectRatio:false,
		data: { 
			/* MESSAGE TO SP: Delete all the dumb data and create a property (update: already created) that you can call in the 
			line chart component at the MainChart.tsx; then insert there the data that resides in the bd.  */
			x: xAxisData as number | string | Date | Moment, //MESSAGE TO SP example: you can call here new Date()
			//MESSAGE TO SP example: there are 5 datasets because there are some charts with more than one line (Dimension and Preominant Tissues)
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
				data: secondData as Array<number | null | undefined> | ChartPoint[]
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
				backgroundColor: fifthBackgroundColorData as ChartColor | ChartColor[] | Scriptable<ChartColor>,
				  borderWidth: 1, 
				  pointHitRadius: 10, 
				data: fifthData as Array<number | null | undefined> | ChartPoint[]
			},
		]
	},
		options:{     
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
				enabled: true,
				mode: 'index' as "label" | "index" | "x" | "point" | "nearest" | "single" | "x-axis" | "dataset" | "y" | undefined,
				callbacks: tooltipCallback as ChartTooltipCallback,
				  footerFontStyle: 'normal'
			}, 
			 pan: {
				enabled: true,
				mode: 'x'
			},
			zoom: {
			enabled: zoomOn,
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
				stepSize: yAxesStepSize,
				callback: yAxesTicksCallback as (
					value: string | number,
					index: number,
					values: number[] | string[]
				) => string | number | null | undefined	
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

	useEffect(() => {
		let language: string;
		language = localStorage.getItem("i18nextLng") || "pt";
        if (language.length > 2) {
            language = language.substr(0, 2).toUpperCase();
		}
		moment.locale(language)

		Chartjs.plugins.register(zoom);
		
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

export default LineChart;