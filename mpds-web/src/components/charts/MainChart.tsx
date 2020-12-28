import React, { useEffect, useRef, useState } from "react";

//OUTSIDE COMPONENTS
import {ChartType} from "chart.js";

//INSIDE COMPONENTS´
import ComboChart from "./childrenTypeCharts/ComboChart"
import LineChart from "./childrenTypeCharts/LineChart"
import ScatterChart from "./childrenTypeCharts/ScatterChart"

//CSS
import "./MainChart.scss"

//TYPES IMPORTS
import { LineChartProps as LineProps} from "./childrenTypeCharts/LineChart"
import { ComboChartProps as ComboProps} from "./childrenTypeCharts/ComboChart"
import { ScatterChartProps as ScatterProps} from "./childrenTypeCharts/ScatterChart"

interface MainChartProps extends LineProps, ComboProps, ScatterProps {
    typeOfChart?: ChartType | string;
}

const MainChart = ({ typeOfChart, 
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
    barColors,
    yAxesStepSize,
    hidden = false
}: MainChartProps) => {

	return (
		<div className="chart-container mx-auto">
            {(() => {
                switch (typeOfChart) {
                    case undefined:
                        return <p>UNDEFINED !!! (WAITING FOR A EMPTY STATE)</p>
                    case "line":
                        return <LineChart 
                            xAxisData={xAxisData}
                            firstLabelData={firstLabelData}
                            firstBorderColorData={firstBorderColorData}
                            firstBackgroundColorData={firstBackgroundColorData}
                            firstData={firstData}
                            secondLabelData={secondLabelData}
                            secondBorderColorData={secondBorderColorData}
                            secondBackgroundColorData={secondBackgroundColorData}
                            secondData={secondData}
                            thirdLabelData={thirdLabelData}
                            thirdBorderColorData={thirdBorderColorData}
                            thirdBackgroundColorData={thirdBackgroundColorData}
                            thirdData={thirdData}
                            fourthLabelData={fourthLabelData}
                            fourthBorderColorData={fourthBorderColorData}
                            fourthBackgroundColorData={fourthBackgroundColorData}
                            fourthData={fourthData}
                            fifthLabelData={fifthLabelData}
                            fifthBorderColorData={fifthBorderColorData}
                            fifthBackgroundColorData={fifthBackgroundColorData}
                            fifthData={fifthData}
                            legendDisplay={legendDisplay}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            tooltipCallback={tooltipCallback}
                            yAxesTicksMin={yAxesTicksMin}
	                        yAxesTicksMax={yAxesTicksMax}
                            yAxesTicksCallback={yAxesTicksCallback}
                            yAxesStepSize={yAxesStepSize}
                            hidden={hidden}
                            ></LineChart>
                    case "combo": //line | bar
                        return <ComboChart
                            firstData={firstData}
                            secondData={secondData}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            barColors={barColors}
                        ></ComboChart>
                    case "scatter":
                        return <ScatterChart
                            firstLabelData={firstLabelData}
                            firstBorderColorData={firstBorderColorData}
                            firstBackgroundColorData={firstBackgroundColorData}
                            firstData={firstData}
                            secondLabelData={secondLabelData}
                            secondBorderColorData={secondBorderColorData}
                            secondBackgroundColorData={secondBackgroundColorData}
                            secondData={secondData}
                            thirdLabelData={thirdLabelData}
                            thirdBorderColorData={thirdBorderColorData}
                            thirdBackgroundColorData={thirdBackgroundColorData}
                            thirdData={thirdData}
                            fourthLabelData={fourthLabelData}
                            fourthBorderColorData={fourthBorderColorData}
                            fourthBackgroundColorData={fourthBackgroundColorData}
                            fourthData={fourthData}
                            fifthLabelData={fifthLabelData}
                            fifthBorderColorData={fifthBorderColorData}
                            fifthBackgroundColorData={fifthBackgroundColorData}
                            fifthData={fifthData}
                            legendDisplay={legendDisplay}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            tooltipCallback={tooltipCallback}
                            yAxesTicksMin={yAxesTicksMin}
	                        yAxesTicksMax={yAxesTicksMax}
                            yAxesTicksCallback={yAxesTicksCallback}
                            hidden={hidden}
                        ></ScatterChart>
                    default:
                        return <p>A LOADING?!</p>
                }
            })()}
		</div>
	);
};

export default MainChart;
