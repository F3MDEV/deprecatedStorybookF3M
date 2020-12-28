import React, { useEffect, useRef, useState } from "react";

//OUTSIDE COMPONENTS
import Chartjs from "chart.js";
import {PluginServiceRegistrationOptions, ChartColor, Scriptable, ChartPoint} from "chart.js";
import moment from 'moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb'

//TYPES IMPORTS
import { LineChartProps as LineProps} from "./LineChart"

export interface ComboChartProps extends LineProps {
	pluginOfChart?: PluginServiceRegistrationOptions[]
	barColors?: ChartColor | ChartColor[] | Scriptable<ChartColor>
}

const ComboChart = ({ pluginOfChart, firstData, secondData, dateFrom, dateTo, barColors, yAxesTicksCallback }: ComboChartProps) => {
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
			type: "bar",
			maintainAspectRatio:false,
			data: {
			  x: new Date(),
			  datasets: [{
				type: 'line',
				label: 'Escala Numérica',
				borderWidth: 1, 
				fill: true,
				pointBackgroundColor: 'blue',
				data: firstData as Array<number | null | undefined> | ChartPoint[],
				borderColor: 'blue'
			  },
			  {
				label: 'Escala de Faces',
				data: secondData as Array<number | null | undefined> | ChartPoint[],
				backgroundColor: barColors as ChartColor | ChartColor[] | Scriptable<ChartColor>
				
			  }]
			},
			options: {
			  legend: {
				position: 'bottom'  as "bottom" | "left" | "right" | "top" | "chartArea" | undefined,
				labels: {
				  fontSize: 10,
				  boxWidth: 20,
				}
			  },
			  tooltips: {
				callbacks: {
				  label: function(tooltipItem:any) {
					return tooltipItem.yAxes;
				  }
				}
			  },
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
					min: dateFrom as string,
					max: dateTo as string,
				  },
				  barThickness: 16,
				}],
				yAxes: [{
				  ticks: {
					stepSize: 1,
					min: 0,
					max: 10,
				  }
				}]
			  },
			  pan: {
				enabled: true,
				mode: 'x',
			  },
			  zoom: {
				enabled: true,
				mode: 'x',
			  },
			  responsive: true
			},   
        	plugins: pluginOfChart as PluginServiceRegistrationOptions[]
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
			<canvas ref={chartContainer} className="chart"/>
		</React.Fragment>
	);
};

export default ComboChart;
