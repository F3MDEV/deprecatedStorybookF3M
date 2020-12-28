import React, { FunctionComponent, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

export interface BackToTopProps{
    /**
        * CSS position gave to the element.
        */
    typeOfThePosition : "static" | "absolute" | "fixed" | "relative" | "sticky" | "initial" | "inherit"
    /**
        * Classes in the button element.
        */
    classes?: string
    /**
        * The duration for the transition, in milliseconds.
        */
    timeOfTransition?: number
    /**
        * Callback fired when element is clicked.
        */
    handleClick?: any
}

const BackToTop : FunctionComponent<BackToTopProps> = ({
    typeOfThePosition = "static",
    classes,
    timeOfTransition= 1000,
    handleClick
}) => {

    const useStyles = makeStyles(theme => ({
        root: {
            position: typeOfThePosition,
            bottom: theme.spacing(3),
            right: theme.spacing(2),
            zIndex: 2
        },
    }));

    const styleClass = useStyles();

    return (
        <Zoom in={true} timeout={timeOfTransition}>

                <Fab onClick={handleClick as any} color="primary" size="small" aria-label="Scroll back to top." className={`${classes} ${styleClass.root}`}>
                    <KeyboardArrowUpIcon />
                </Fab>
          
        </Zoom>
    );
}

export default BackToTop;