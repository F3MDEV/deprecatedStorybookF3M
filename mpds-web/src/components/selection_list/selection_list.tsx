import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckIcon from '@material-ui/icons/Check';
interface SelectionList {
    titleItemOne?: string,
    titleItemTwo?: string,
    titleItemThree?: string,
    titleItemFour?: string,
    titleItemFive?:string,
    selectedItemOne?:any,
    selectedItemTwo?:any,
    selectedItemThree?:any,
    selectedItemFour?:any,
    selectedItemFive?:any,
    onClickItemOne?:any,
    onClickItemTwo?:any,
    onClickItemThree?:any,
    onClickItemFour?:any,
    onClickItemFive?:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 267,
      backgroundColor: theme.palette.background.paper,
      fontSize: '0.875rem',
      color: '#494949',
      paddingTop: 0,
      paddingBottom: 0,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.background.paper,
        fontSize: '0.875rem',
        /* backgroundColor: palette.grey[100],
        color: palette.text.primary, */
      },
    },
    selected: {
      '&.Mui-selected': {
        color: '#494949',
        backgroundColor: theme.palette.background.paper,
        fontWeight: 700,
        fontSize: '0.875rem',
        '&:hover, &:focus': {
          fontWeight: 700,
          backgroundColor: theme.palette.background.paper,
          fontSize: '0.875rem',
          '&:before': {
            backgroundColor: theme.palette.background.paper,
          },
        },
        '&:after': {
          content: 'some content',
        },
      },
    },
  }),
);

const SelectionList: FunctionComponent<SelectionList> = ({
    titleItemOne,
    titleItemTwo,
    titleItemThree,
    titleItemFour,
    titleItemFive,
    selectedItemOne,
    selectedItemTwo,
    selectedItemThree,
    selectedItemFour,
    selectedItemFive,
    onClickItemOne,
    onClickItemTwo,
    onClickItemThree,
    onClickItemFour,
    onClickItemFive,
    children
}) => {
  const classes = useStyles();

    

  return (
    <div className={classes.root}>
      <List component="nav" disablePadding aria-label="secondary mailbox folder">
        <ListItem
          button
          classes={classes}
          selected={selectedItemOne}
          onClick= {onClickItemOne}
        >
          <ListItemText classes={classes} primary={titleItemOne} /> 
          {selectedItemOne ? <ListItemSecondaryAction> <CheckIcon color="primary" fontSize={'small'}/></ListItemSecondaryAction> : "" }
        </ListItem>
        <ListItem
          button
          classes={classes}
          selected={selectedItemTwo}
          onClick= {onClickItemTwo}
        >
          <ListItemText classes={classes} primary={titleItemTwo} />
          {selectedItemTwo ? <ListItemSecondaryAction> <CheckIcon color="primary" fontSize={'small'}/></ListItemSecondaryAction> : "" }
        </ListItem>
        <ListItem
          button
          classes={classes}
          selected={selectedItemThree}
          onClick= {onClickItemThree}
        >
          <ListItemText classes={classes} primary={titleItemThree} />
          {selectedItemThree ? <ListItemSecondaryAction> <CheckIcon color="primary" fontSize={'small'}/></ListItemSecondaryAction> : "" }
        </ListItem>
        <ListItem
          button
          classes={classes}
          selected={selectedItemFour}
          onClick= {onClickItemFour}
        >
          <ListItemText classes={classes} primary={titleItemFour} />
          {selectedItemFour ? <ListItemSecondaryAction> <CheckIcon color="primary" fontSize={'small'}/></ListItemSecondaryAction> : "" }
        </ListItem>
        <ListItem
          button
          classes={classes}
          selected={selectedItemFive}
          onClick= {onClickItemFive}
        >
          <ListItemText classes={classes} primary={titleItemFive} />
          {selectedItemFive ? <ListItemSecondaryAction> <CheckIcon color="primary" fontSize={'small'}/></ListItemSecondaryAction> : "" }
        </ListItem>
      </List>
    </div>
  );
}

export default SelectionList;
