import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export interface SliderArrowProps {
    /**
        * Classes given to the element.
    */
    classes?:string
    /**
        * Orientation of the arrow.
    */
    to?:string
    /**
        * Callback when clicked.
    */
    onClick?:any
    /**
        * Color given to the icon.
    */
    colorOfTheIcon?:string
}

const SliderArrow = ({ classes, to, onClick, colorOfTheIcon = "#03a9f4" }: SliderArrowProps) => {
    const useStyles = makeStyles(theme => ({
        buttonSliderRoot: {
            cursor: "pointer",
            opacity: .7,
            position: "absolute",
            padding: 0,
            border: "none",
            background: "transparent",
            color: colorOfTheIcon,
            outline: "none",
            "&:hover": {
                opacity: 1,
            }
        },
       
    }))

    const styleClass = useStyles();
    
    return(
        <>
            <button
                type='button'
                onClick={onClick}
                className={`${styleClass.buttonSliderRoot} ${classes}`}
                aria-label={to}>
                    <ArrowBackIosIcon className='icon'/>
            </button>
        </>
    )
};

export default SliderArrow;
