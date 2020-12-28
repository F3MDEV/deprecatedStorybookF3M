import React, { FunctionComponent, useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";

//OUTSIDE COMPONENTS
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

//CSS, STYLES & MEDIA ASSETS
import variables from "../../assets/bootstrap/scss/_variables.scss"
import "./sliderWithScale.scss";

interface SliderWithScalesProps{
    ariaValueText: any, 
    getAriaLabel: any,
    ariaLabelledby:string, 
    ariaLabel: string,
    initialValue: number | Array<number>,
    numberOfStepsPerMove: number,
    marksLabels: boolean | Array<any>,
    minNumber: number,
    maxNumber: number,
    thumbHTMLElement: any,
    displayValueBallon: any,
    labelFormat: any,
    sliderValue: number | Array<number>,
    className:any,
    disabled: boolean,
    barProps: string,
    name: string
}

//Scss variable
const disabledColor = variables.mainText;
const primaryColor = variables.primary;

const SliderWithScales = ({ariaValueText, 
  getAriaLabel, 
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
  sliderValue,
  className,
  barProps,
  disabled, 
  name
 }: SliderWithScalesProps) =>{

    const { t } = useTranslation();

    /*  TOOLTIP STYLES */
    const useStylesBootstrap = makeStyles(theme => ({
        arrow: {
            color: disabled ? disabledColor : primaryColor
        },
        tooltip: {
            backgroundColor: disabled ? disabledColor : primaryColor,
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
                title={title}
            >
                {children}
            </Tooltip>
        );
    }

  /* SLIDER COMPONENT STYLES */
    const SliderWithScalesStyle = withStyles({
        root: {
            color: disabled ? disabledColor : primaryColor,
            height: 8,
        },
        thumb: {
            height: 16,
            width: 16,
            backgroundColor: disabled ? disabledColor : primaryColor,
            border: `2px solid ${disabled ? disabledColor : primaryColor}`,
            marginTop: -6,
            marginLeft: -12,
            "&:focus,&:hover,&$active": {
            boxShadow: "inherit",
            }
        },
        active: {},
        valueLabel: {
            color: disabled ? disabledColor : primaryColor,
            backgroundColor: disabled ? disabledColor : primaryColor,
        },
        track: {
            height: 3,
            borderRadius: 4,
            backgroundColor: disabled ? disabledColor : primaryColor,
        },
        markLabel: {
            color: disabled ? disabledColor : primaryColor,
        },
        mark: {
            visibility: "hidden"
        },
        rail: {
            height: 3,
            borderRadius: 4
        }
    })(Slider);

    const [valueSlider, setValueSlider] = useState(sliderValue);
    const onChangeValue = (event:any, v: any) => {
        setValueSlider(v);
    }

    useEffect(() => {
        setValueSlider(sliderValue)
    }, [sliderValue, disabled]);
  

    return(
        <>
            <div className="position-relative">
            <div className={`position-absolute left-label scales ${sliderValue <= 30 ? !disabled ? "active-scale" : "active-scale-disabled" : ""}`}>{t('WoundsTerms.LowM')}</div>
            <div className={`position-absolute right-0 left-0 text-center scales ${sliderValue <= 70 && sliderValue > 30 ? !disabled ? "active-scale" : "active-scale-disabled" : ""}`}>{t('WoundsTerms.ModerateM')}</div>
            <div className={`position-absolute right-0 right-label scales  ${sliderValue <= 100 && sliderValue > 70 ? !disabled ? "active-scale" : "active-scale-disabled" : ""}`}>{t('WoundsTerms.HighM')}</div>
            <div className={`${ barProps } bar `} />
            <div className={`bar left-30 ${ barProps }`} />
            <div className={`bar left-70 ${ barProps }`} />
            <div className={`bar right-0 ${ barProps }`} />
                <SliderWithScalesStyle
                    getAriaValueText={ariaValueText}
                    getAriaLabel={getAriaLabel}
                    aria-labelledby={ariaLabelledby}
                    ValueLabelComponent={ValueLabelComponent}
                    aria-label={ariaLabel}
                    //defaultValue={initialValue}
                    step={numberOfStepsPerMove}
                    marks={marksLabels}
                    min={minNumber} 
                    max={maxNumber}
                    ThumbComponent={thumbHTMLElement}
                    valueLabelDisplay={displayValueBallon}
                    valueLabelFormat={labelFormat}
                    value={valueSlider}
                    className={className}
                    onChange={(event, value) => onChangeValue(event, value)}
                    disabled={disabled}
                    name={name}
                />
            </div>
        </>
    )
  }
  
export default SliderWithScales