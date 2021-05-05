import React, {FunctionComponent} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

interface F3MButtonGroupProps {
  /**
    * Array with content to all buttons to be drawn
  */
  content: Array<any>,
  /**
    * The color of the component. It supports those theme colors that make sense for this component.
  */
  color?:	'default' | 'inherit' | 'primary' | 'secondary',
  /**
    * Size of buttons
  */
  size?: "small" | "medium" | "large",
  /**
    * Height of buttons
  */
  height?: string,
  /**
    * Radius borders of buttons
  */
  borderRadius?: string,
  /**
    * Action when button is clicked 
  */
  onClick?: any,
}

const F3MButtonGroup : FunctionComponent<F3MButtonGroupProps> = ({
  content, color,size, height, borderRadius,onClick}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: borderRadius,
        '& > *': {
          borderRadius: borderRadius,
          height: height
      }
    }
  }));

  const styleClass = useStyles();

  return (
    <ButtonGroup className={styleClass.root} color={color} aria-label="outlined primary button group" size={size}>
      {content.map((item : any, x : number) => { 
        return(<Button onClick={onClick}>{item}</Button>) 
      })}
    </ButtonGroup>
  );
};

export default F3MButtonGroup;
