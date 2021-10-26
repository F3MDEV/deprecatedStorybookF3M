/* import PropTypes from 'prop-types';
import React from 'react';
import './selection.json';
import './selection-activities.json';
import IcoMoon from 'react-icomoon';
import Selection from './selection.json';
import SelectionActivities from './selection-activities.json';

const Icon = ({ iconSet = 0, ...props }) => {
  const iconPack = {
    0: require(Selection),
    1: require(SelectionActivities)
  };

  return <IcoMoon icon={''} iconSet={iconPack[iconSet]} {...props} />;
};

Icon.propTypes = {
  iconSet: PropTypes.number,
};

export default Icon;
 */