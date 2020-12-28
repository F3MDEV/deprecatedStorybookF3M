import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

//ICONS
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
        '& .MuiButton-root': {
            height: 40,
            width: 43,
            minWidth: 43,
            padding: 6
        },
        /*  '& .MuiTextField-root':{
             marginLeft: 0,
             paddingLeft: 0,
         } */


    },
}));

export default function TreatmentsList(props) {

    const classes = useStyles();

    const products = props.products || []

    const deleteProduct = (value) => (event) => {
        props.deleteProduct(value)
    };
    
    const addProduct = (event) => {
        props.addProduct(product.value)
        setProduct({
            value: ''
        })
    }

    const [product, setProduct] = useState({value: ''})
    const handleChangeText = (event) => {
        if(event !== undefined){
            setProduct({
                value: event.target.value
            })
        }
    }

    return (
        <>
            <div className="d-flex flex-column" >
                {products.map((option,index) => (
                    <Grid container spacing={1} alignItems="flex-end" className={`${classes.root} mt-4`} key={'treatmentsList'+index}>
                        <Grid item className="pt-3 pr-4">
                            <TextField
                                id={"filled-size-small"+index}
                                size="small"
                                value={option}
                                className="mx-0 mb-0"
                                disabled={props.disabled}
                            />
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="contained" hidden={!props.editMode} onClick={deleteProduct(option)}>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </Grid>
                    </Grid>

                ))}

                <Grid container spacing={1} alignItems="flex-end" className={`${classes.root} mt-4`} hidden={!props.editMode}>
                    <Grid item className="pt-3 pr-4" >
                        <TextField
                            id="addProduct"
                            size="small"
                            className="mx-0 mb-0"
                            value={product.value}
                            onChange={handleChangeText}
                        />
                    </Grid>
                    <Grid item>
                        <Button id="buttonAddTreatments" color="primary" variant="contained" onClick={addProduct} disabled={product.value === ''}>
                            <AddIcon></AddIcon>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}