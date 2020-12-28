import React from 'react';

// OUTSIDE COMPONENTS
import Box from '@material-ui/core/Box';

const ContentHeaderTitle = (props) => {
  return (
    <Box
      fontSize={props.fontSize}
      fontFamily={props.fontFamily}
      className={props.classes}
      hidden={props.hidden}
    >
      {props.title}
    </Box>
  );
};

export default ContentHeaderTitle;
