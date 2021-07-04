import * as React from 'react';
import { makeStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

export interface SearchTerminatorProps {
    
}

export const teste = ({
   
}: SearchTerminatorProps) => {
    const useStyles = makeStyles((theme) => ({
        dInlineFlex: {
            display: 'inline-flex'
        },
        w100: {
            width: '100%'
        },
        justifyContentCenter: {
            justifyContent: 'center'
        },
    }
    ));

    const classes = useStyles();

    return (
        <>
            <div className={`${classes.dInlineFlex} ${classes.w100} ${classes.justifyContentCenter}`} onClick={(e) => e.stopPropagation()}>

                <TextField />

            </div>
        </>
    );
};

export default teste;