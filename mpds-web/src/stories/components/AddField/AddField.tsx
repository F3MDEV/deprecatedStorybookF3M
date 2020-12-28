import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

//ICONS
import AddIcon from '@material-ui/icons/Add';

export interface AddFieldProps {
    /**
        * A 
    */
    onAddClick?: any,
    /**
        * A preencher
    */
    disableButton?: any,
    /**
        * A preencher
    */
    onChangeTextfield?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    /**
        * A preencher
    */
    colorOfTheButton?: "inherit" | "default" | "primary" | "secondary" | undefined,
}

const useStyles = makeStyles(theme => ({
    root: {
        '&.MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
        '&.MuiButton-root': {
            height: 40,
            width: 43,
            minWidth: 43,
            padding: 6
        },
    },
    displayFlex: {
        display: "flex"
    },
    flexColumn: {
        /* -ms-flex-direction: "column", */
        flexDirection: "column"
    },
    mt4:{
        marginLeft: 15,
    },
    pt3:{
        paddingTop: 10,
    },
    pr4:{
        paddingRight: 15,
    },
    mx0:{
        marginLeft: 0,
        marginRight: 0.
    },
    mb0:{
        marginBottom: 0,
    }
}));


const AddField = ({ onChangeTextfield, colorOfTheButton, onAddClick, disableButton }: AddFieldProps) => {

    const styleClass = useStyles();

    return (
        <>
            <div className={`${styleClass.displayFlex} ${styleClass.flexColumn}`} >
                <Grid container spacing={1} alignItems="flex-end" className={`${styleClass.root} ${styleClass.mt4}`} /* hidden={!props.editMode} */>
                    <Grid item className={`${styleClass.pt3} ${styleClass.pr4}`}>
                        <TextField
                            id="addProduct"
                            size="small"
                            className={`${styleClass.mx0} ${styleClass.mb0}`}
                            onChange={onChangeTextfield}
                        />
                    </Grid>
                    <Grid item>
                        <Button id="buttonAddTreatments"
                            color={colorOfTheButton}
                            variant="contained"
                            onClick={onAddClick}
                            disabled={disableButton}>
                            <AddIcon></AddIcon>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default AddField;
