import React, { FunctionComponent, useEffect, useState} from 'react';

//OUTSIDE COMPONENTS
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

export interface SliderWithScalesProps{
    /**
        * A string value that provides a user-friendly name for the current value of the slider.
        */
    ariaValueText?: any,
    /**
        * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
        */
    getAriaLabel?: any,
    /**
        * The id of the element containing a label for the slider.
        */
    ariaLabelledby?:string,
    /**
        * The label of the slider.
        */
    ariaLabel?: string,
    /**
        * The default element value. Use when the component is not controlled.
        */
    initialValue?: number | Array<number>,
    /**
        * The granularity with which the slider can step through values. (A "discrete" slider.) The min prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible by the step.
When step is null, the thumb can only be slid onto marks provided with the marks prop.
        */
    numberOfStepsPerMove?: number,
    /**
        * Marks indicate predetermined values to which the user can move the slider. If true the marks will be spaced according the value of the step prop. If an array, it should contain objects with value and an optional label keys.
        */
    marksLabels?: boolean | Array<any>,
    /**
        * The minimum allowed value of the slider. Should not be equal to max.
        */
    minNumber?: number,
    /**
        * The maximum allowed value of the slider. Should not be equal to min.
        */
    maxNumber?: number,
    /**
        * The component used to display the value label.
        */
    thumbHTMLElement?: any,
    /**
        * Controls when the value label is displayed:
- auto the value label will display when the thumb is hovered or focused. - on will display persistently. - off will never display.
        */
    displayValueBallon?: any,
    /**
        * The format function the value label's value.
            When a function is provided, it should have the following signature:
            - {number} value The value label's value to format - {number} index The value label's index to format
        */
    labelFormat?: any,
    /**
        * Checks if the button should be disabled
        */
    /* sliderValue?: number | Array<number>, */
    /**
        * If true, the slider will be disabled.
        */
    disabled?: boolean,
    /**
        * Checks if the button should be disabled
        */
    barProps?: string,
    /**
        * Name attribute of the hidden input element.
        */
    name?: string
    /**
         * Width of the slider
         */
    widthOfTheSlide?: number | string
    /**
         * Actual value of the slider
         */
    valueSlider?: any
    /**
         * Color of the thumb
         */
    sliderMainColor?: string
    /**
         * Color of the arrow under the tooltip
         */
    arrowTooltipColor?:String
    /**
         * Tooltip color element
         */
    tooltipColor?:String
    /**
         * Callback function that is fired when the slider's value changed.
         */
    onChange?: (event: object, value: number | number[]) => void
    /**
         * First scale text
         */
    firstScale?: String
    /**
         * Second scale text
         */
    secondScale?: String
    /**
         * Third scale text
         */
    thirdScale?: String
}

export const SliderWithScales = ({
    ariaValueText,
    getAriaLabel,
    valueSlider,
    ariaLabelledby,
    ariaLabel,
    initialValue,
    numberOfStepsPerMove,
    marksLabels,
    minNumber,
    maxNumber,
    thumbHTMLElement,
    displayValueBallon,
    labelFormat,
    /* sliderValue, */
    disabled,
    barProps,
    name,
    widthOfTheSlide,
    sliderMainColor = "#06B9E4",
    arrowTooltipColor= "#FBAF30",
    tooltipColor= "#FBAF30",
    onChange,
    firstScale = "Low",
    secondScale = "Moderate",
    thirdScale = "High"
 }: SliderWithScalesProps) => {

    /*  TOOLTIP STYLES */
    const useStylesBootstrap = makeStyles(theme => ({
        arrow: {
            color: arrowTooltipColor as string,
        },
        tooltip: {
            backgroundColor: tooltipColor as string,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            fontSize: 12,
            border: "10px",
        }
    }));

    const ValueLabelComponent: FunctionComponent<{ children: any, open: any, value: any }> = ({ children, open, value }) => {
        const classes = useStylesBootstrap();
        const [title, setTitle] = useState(value);
        const [openToolTip, setopenToolTip] = useState(open);

        useEffect(() => {
            setTitle(value)
            setopenToolTip(open)
        }, [value,open]);

        return (
            <Tooltip
                classes={classes}
                arrow
                open={openToolTip}
                placement="top"
                title={title} >
                {children}
            </Tooltip>
        );
    }

  /* SLIDER COMPONENT STYLES */
    const SliderWithScalesStyle = withStyles({
        root: {
            color: sliderMainColor, /* "#4CB3BA", */
            height: 8,
            width: widthOfTheSlide,
        },
        thumb: {
            height: 12,
            width: 12,
            backgroundColor: sliderMainColor,
            border: `2px solid ${sliderMainColor}`,
            "&:focus,&:hover,&$active": {
            boxShadow: "inherit",
            }
        },
        active: {},
        valueLabel: {
            color: sliderMainColor,
            backgroundColor: sliderMainColor,
        },
        track: {
            height: 3,
            borderRadius: 4,
            backgroundColor: sliderMainColor,
        },
        markLabel: {
            color: sliderMainColor,
        },
        mark: {
            visibility: "hidden"
        },
        rail: {
            height: 3,
            borderRadius: 4
        }
    })(Slider);

    const useStyles = makeStyles(theme => ({
        bar:{
            width: 1,
            height: 50,
            background: sliderMainColor,
            position: "absolute",
            [theme.breakpoints.up('md')]: {
                top: 25,
            },
        },
        textCenter:{
            textAlign: "center",
        },
        rightLabel :{
            right:"15%",
            transform: "translate(50%)",
        },
        leftLabel: {
            left: "15%",
            transform: "translate(-50%)",
        },
        leftZero: {
            left: 0,
        },
        rightZero: {
            right: 0,
        },
        left30: {
            left: "30%",
        },
        left70: {
            left: "70%",
        },
        positionRelative: {
            position: "relative",
        },
        positionAbsolute: {
            position: "absolute",
        },
        scales: {
            fontSize: 14,
            fontWeight: 700,
            color: "#494949",
            opacity: ".4",
            fontFamily: 'Roboto Condensed'
        },
        hSliderScales: {
            height: 65,
        },
        top60: {
            top: 60,
        },
        sliderWidth:{
            width: widthOfTheSlide,
        }
    }))

    const styleClass = useStyles();

    return(
        <>
            <div className={`${styleClass.positionRelative} ${styleClass.sliderWidth}`}>
                <div className={`${styleClass.positionAbsolute}  ${styleClass.leftLabel} ${styleClass.scales}`}>{firstScale}</div>
                <div className={`${styleClass.positionAbsolute} ${styleClass.rightZero} ${styleClass.leftZero} ${styleClass.textCenter} ${styleClass.scales}`}>{secondScale}</div>
                <div className={`${styleClass.positionAbsolute}  ${styleClass.rightLabel} ${styleClass.scales} `}>{thirdScale}</div>
                <div className={`${ barProps } ${styleClass.bar}`} />
                <div className={`${styleClass.bar} ${styleClass.left30} ${ barProps }`} />
                <div className={`${styleClass.bar} ${styleClass.left70} ${ barProps }`} />
                <div className={`${styleClass.bar} ${styleClass.rightZero} ${ barProps }`} />

                <SliderWithScalesStyle
                    getAriaValueText={ariaValueText}
                    getAriaLabel={getAriaLabel}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    ValueLabelComponent={ValueLabelComponent}
                    defaultValue={initialValue}
                    step={numberOfStepsPerMove}
                    marks={marksLabels}
                    min={minNumber}
                    max={maxNumber}
                    ThumbComponent={thumbHTMLElement}
                    valueLabelDisplay={displayValueBallon}
                    valueLabelFormat={labelFormat}
                    value={valueSlider}
                    className={`${styleClass.top60} ${styleClass.hSliderScales}`}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                />
            </div>
        </>
    )
  }

export default SliderWithScales
