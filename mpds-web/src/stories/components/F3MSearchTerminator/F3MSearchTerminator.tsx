import * as React from 'react';
import { IconButton, InputAdornment, makeStyles, Paper } from "@material-ui/core";
import { Table, TableBody, TableRow, TableCell, Avatar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EmptyStateSearch from './componentAssets/emptyStateSearch';
import TemplateFilters from './componentAssets/template-filter';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchTerminatorProps {
    /**
    * Attach elements to the left side of the input.
    */
    aside?: any
    /**
    * It shows the results of the search when it has something.
    */
    results?: any
    /**
    * Value in the input.
    */
    value: any
    /**
    * Color of the input.
    */
    color?: 'primary' | 'secondary'
    /**
   * Label of the input.
   */
    label?: string
    /**
   * Size of the input.
   */
    size?: 'medium' | 'small'
    /**
    * Variant of the textfield.
    */
    variantTextfield?: 'filled' | 'outlined' | 'standard'
    /**
    * Width of the input.
    */
    inputWidth?: number
    /**
   * Background color of the input.
   */
    backgroundColorInput?: any
    /**
    * Show or hide the filter panel and his content.
    */
    showFilters?: boolean
    /**
    * Show or hide the empty state.
    */
    showEmptyStateSearch?: boolean
    /**
    * Show or hide the results 
    */
    showResults?: boolean
    /**
    * Placeholder Input
    */
    placeholderInput?: string
    /**
    * Classes of the input label
    */
    inputLabelClasses?: string
    /**
   * Classes of the input
   */
    inputClasses?: string
    /**
    * StartAdornment content
    */
    startAdornmentInput?: any
    /**
    * EndAdornment content
    */
    endAdornmentInput?: any
}

export const SearchTerminator = ({
    results = <>
        <Table aria-label="simple table">
            <TableBody>
                <TableRow>
                    <TableCell component="td" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Cesária Costa" src="../componentAssets/account-circle.svg" style={{ marginRight: 10 }} />
                        Cesária Costa
                    </TableCell>
                    <TableCell>123456789</TableCell>
                    <TableCell>86 anos</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>,
    aside,
    showFilters = true,
    value = '',
    color = 'primary',
    label = 'Search',
    size = 'small',
    variantTextfield = 'outlined',
    inputWidth = 700,
    backgroundColorInput,
    showEmptyStateSearch = false,
    showResults = false,
    placeholderInput = "Search here!",
    inputLabelClasses,
    inputClasses,
    startAdornmentInput = (
        <InputAdornment position="start">
            <SearchIcon color="primary" fontSize="large" />
        </InputAdornment>
    ),
    endAdornmentInput = (
        <>
            <InputAdornment position="end">
                <IconButton
                    size="small">
                    <CloseIcon />
                </IconButton>
            </InputAdornment>
        </>
    )
}: SearchTerminatorProps) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '&.MuiAccordionSummary-content': {
                height: 41,
            },
            "&.MuiAccordionSummary-root.Mui-expanded": {
                minHeight: 41,
                margin: 0
            },
            "&.MuiAccordion-root.Mui-expanded": {
                margin: 0,
            },
            "&.MuiChip-root": {
                background: "#444444",
                color: "#ffffff",
                height: 18
            },
            "&.MuiAccordionDetails-root": {
                display: 'unset',
            },
            '&.MuiFormControlLabel-root': {
                width: 224,
                paddingLeft: 10,
                paddingRight: 10
            },
            '&.MuiRadio-root': {
                marginRight: 5,
                marginLeft: 5
            },
        },
        dInlineFlex: {
            display: 'inline-flex'
        },
        w100: {
            width: '100%'
        },
        justifyContentCenter: {
            justifyContent: 'center'
        },
        aside: {
            marginRight: 10,
        },
        containerChipsFilter: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        input: {
            height: 54,
            width: inputWidth,
            background: backgroundColorInput,
            "&::placeholder": {
                textOverflow: "ellipsis !important",
                color: "blue",
                fontSize: 14
            }
        },
        inputAttachments: {
            position: "absolute",
            top: 55,
            width: inputWidth,
        },
        extraSmallIcon: {
            width: 20,
            height: 20
        },
        expanded: {
            minHeight: 41
        },
        content: {
            "&.MuiAccordionSummary-content.Mui-expanded": {
                margin: 0,
            }
        },
    }
    ));

    const classes = useStyles();

    const inputProps = {
        label,
        color,
        value,
        placeholder: placeholderInput,
        size,
        variant: variantTextfield,
        InputLabelProps: {
            classes: {
                root: ` ${classes.w100} ${inputLabelClasses} `,
            },
        },
        InputProps: {
            className: `${classes.input} + '' + ${classes.w100} + '' + ${inputClasses} `,
            startAdornment: startAdornmentInput,
            endAdornment: endAdornmentInput
        },
    };

    return (
        <>
            <div className={`${classes.dInlineFlex} ${classes.w100} ${classes.justifyContentCenter}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${classes.aside}`}>
                    {aside}
                </div>
                <TextField {...inputProps} />

                <div hidden={!showResults} className={classes.inputAttachments}>
                    {results}
                </div>

                <div hidden={!showEmptyStateSearch} className={classes.inputAttachments}>
                    <Paper elevation={3}>
                        <EmptyStateSearch />
                    </Paper>
                </div>

                <div hidden={!showFilters} className={classes.inputAttachments}>
                    <TemplateFilters
                        isOpen={showFilters}
                    />
                </div>
            </div>
        </>
    );
};

export default SearchTerminator;