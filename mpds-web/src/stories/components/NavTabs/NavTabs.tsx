import React, { FunctionComponent, useState, useEffect } from 'react';
/* import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from 'moment'; */

//OUTSIDE COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { withStyles, makeStyles } from '@material-ui/core/styles';

//CSS, STYLES & MEDIA ASSETS
import logo_icon from '../../../utils/icon_MPDS.svg';
import variables from '../../../assets/bootstrap/scss/_variables.scss';

//ICONS
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

export interface NavTabsProps {
  /**
   * Change event on tabs element
   */
  onChangeTabs?: (event: React.ChangeEvent<{}>, value: any) => void;
  /**
   * Tabs indicator Color
   */
  tabsIndicatorColor?: 'secondary' | 'primary' | undefined;
  /**
   * Disable the back button
   */
  backButtonDisable?: boolean;
  /**
   * Insert classes in the root of Edit Controls
   */
  editControlsRoot?: string;
  /**
   * Hide Edit Controls
   */
  hiddenEditControls?: boolean;
  /**
   * OnClick of dropdown
   */
  onClickToggleDropdown?: any;
  /**
   * Classes of the dropdown classes
   */
  arrowToggleDropdownClasses?: string;
  /**
   * OnClick of back base button
   */
  onClickGoBack?: any;
  /**
   * Dropdown title
   */
  toggleDropdownTitle?: string;
  /**
   * Href of the dropdown
   */
  hrefToggleDropdown?: string;
  /**
   * Text aligned to the right of back button
   */
  backButtonTitle?: string;
  /**
   * Text aligned to the right of back button
   */
  dropDownItems?: Array<string>;
  /**
   * Text aligned to the right of back button
   */
  onClickCreate?: any;
  /**
   * Text aligned to the right of back button
   */
  disableCreate?: any;
  /**
   * Text aligned to the right of back button
   */
  onClickSave?: any;
  /**
   * Text aligned to the right of back button
   */
  disableSave?: any;
  /**
   * Text aligned to the right of back button
   */
  onClickClear?: any;
  /**
   * Text aligned to the right of back button
   */
  disableClear?: any;
}

const secondaryFont = variables.secondaryFont;

const NavTabs: FunctionComponent<NavTabsProps> = ({
  onChangeTabs,
  tabsIndicatorColor = 'primary',
  backButtonDisable = false,
  editControlsRoot,
  hiddenEditControls = false,
  onClickToggleDropdown,
  arrowToggleDropdownClasses,
  onClickGoBack,
  toggleDropdownTitle = 'Report',
  hrefToggleDropdown = '/',
  backButtonTitle = 'Previous',
  dropDownItems = ['F3M', 'PIU', 'F3M'],
  onClickCreate,
  disableCreate,
  onClickSave,
  disableSave,
  onClickClear,
  disableClear
}) => {
  const useStyles = makeStyles((theme) => ({
    dropdownTabItem: {
      fontWeight: 900,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      float: 'left',
      display: '-webkit-box',
      lineClamp: 1,
      boxOrient: 'vertical',
      wordBreak: 'break-all'
    },
    dBlock: {
      display: 'block'
    },
    pt3: {
      paddingTop: 10
    },
    pb4: {
      paddingBottom: 15
    },
    textUppercase: {
      textTransform: 'uppercase'
    },
    textRight: {
      textAlign: 'right'
    },
    pr2: {
      paddingRight: 5
    },
    pt2: {
      paddingTop: 5
    },
    pr3: {
      paddingRight: 10
    },
    pr5: {
      paddingRight: 30
    },
    prLg0: {
      [theme.breakpoints.up('lg')]: {
        paddingRight: 0
      }
    },
    outlineNone: {
      outline: 'none'
    },
    mt2: {
      marginTop: 5
    },
    mb2: {
      marginBottom: 5
    },
    mr1: {
      marginRight: 2.5
    },
    rotateClosed: {
      transform: 'rotate(0deg)'
    },
    dNone: {
      display: 'none'
    },
    dFlex: {
      display: 'flex'
    },
    dMdNone: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    dMdDownNone: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    dMdBlock: {
      [theme.breakpoints.up('md')]: {
        display: 'block'
      }
    },

    dLgBlock: {
      [theme.breakpoints.up('lg')]: {
        display: 'block'
      }
    },
    textDecorationNone: {
      textDecoration: 'none'
    },
    fontWeightBold: {
      fontWeight: 'bold'
    },
    dropdownList: {
      width: 200,
      boxShadow: '2px 3px 6px 1px #4949492a',
      border: 'none'
    },
    dropdownListItem: {
      color: '#4CB3BA',
      fontSize: 13,
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 20,
      paddingRight: 20,
      letterSpacing: 0.6,
      fontFamily: 'Nunito',
      fontWeight: 400,
      '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
      }
    },
    dropdownTabs: {
      color: '#4CB3BA',
      margin: '1px 0 0 auto'
    },
    opacity50: {
      opacity: 0.5
    },
    borderNav: {
      borderBottom: '1px solid #A9DADB'
    },
    bigIndicator: {
      height: 4
    },
    navbarTabHeight: {
      minHeight: 'unset'
    },
    navContainer: {
      height: 45
    },
    editControls: {
      margin: '0 -17px 0 auto',
      width: 162
    },
    iconLargeSizeCustom: {
      fontSize: 30
    },
    marginFixIcon: {
      marginTop: -5
    },
    nunitoFont: {
      fontFamily: 'Nunito'
    },
    navbarReturn: {
      padding: '0px 0px 0px 0px !important',
      marginRight: '15px !important'
    }
  }));

  const styleClass = useStyles();

  const CustomToggleInstitution = React.forwardRef(({ children /* onClick */ }, ref) => (
    <a
      className={`${styleClass.textDecorationNone} ${styleClass.fontWeightBold} ${styleClass.dBlock}`}
      href={hrefToggleDropdown}
      onClick={onClickToggleDropdown}
    >
      <Box
        fontFamily={secondaryFont}
        fontWeight={700}
        fontSize={14}
        className={`${styleClass.dBlock}`}
      >
        <span
          className={`${styleClass.dropdownTabItem} ${styleClass.pt3} ${styleClass.textUppercase} ${styleClass.textRight} ${styleClass.pr2}`}
        >
          {toggleDropdownTitle}
        </span>
        <ExpandMoreIcon
          className={`${styleClass.mt2} ${styleClass.outlineNone} ${styleClass.rotateClosed} ${arrowToggleDropdownClasses}`}
          fontSize='large'
        />
      </Box>
    </a>
  ));

  let tabs = (
    <>
      <Dropdown
        className={`${styleClass.dMdNone} ${styleClass.dBlock} ${styleClass.dropdownTabs}`}
      >
        <Dropdown.Toggle id={'0'} as={CustomToggleInstitution}></Dropdown.Toggle>
        <Dropdown.Menu
          alignRight
          className={`${styleClass.pt3} ${styleClass.pb4} ${styleClass.dropdownList}`}
        >
          {dropDownItems.map((item, index) => (
            <Dropdown.Item
              as='button'
              className={`${styleClass.dropdownListItem} ${styleClass.textUppercase}`}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Tabs
        className={`${styleClass.dNone} ${styleClass.dMdBlock} ${styleClass.bigIndicator}`}
        indicatorColor={tabsIndicatorColor}
        textColor='primary'
        onChange={onChangeTabs}
        value={0}
      >
        {dropDownItems.map((item, index) => (
          <Tab label={item} value={index} />
        ))}
      </Tabs>
    </>
  );

  return (
    <>
      <div
        className={`${styleClass.borderNav} ${styleClass.navContainer}`}
        id='nav-container'
      >
        <div className={`${styleClass.dFlex}`}>
          <ButtonBase
            className={`${backButtonDisable ? styleClass.opacity50 : ''} ${styleClass.pr3
              } ${styleClass.prLg0} ${styleClass.mb2} ${styleClass.outlineNone}`}
            disableRipple
            disableTouchRipple
            focusRipple
            type='submit'
            disabled={backButtonDisable}
            onClick={onClickGoBack}
          >
            <IconButton
              className={`${styleClass.mr1} ${styleClass.navbarReturn} ${styleClass.outlineNone}`}
              color='primary'
            >
              <ArrowBackIcon
                fontSize={'large'}
                className={`${styleClass.iconLargeSizeCustom}`}
              />
            </IconButton>
            <Box
              color='#3f51b5'
              fontSize={20}
              fontWeight={700}
              className={`${styleClass.textUppercase} ${styleClass.pr5} ${styleClass.dNone} ${styleClass.dMdBlock} ${styleClass.nunitoFont}`}
            >
              {backButtonTitle}
            </Box>
          </ButtonBase>
          {tabs}
          <div
            className={`${styleClass.editControls} ${editControlsRoot}`}
            hidden={hiddenEditControls}
          >
            <IconButton
              color='primary'
              className={`${styleClass.marginFixIcon} ${styleClass.outlineNone}`}
              onClick={onClickCreate}
              disabled={disableCreate}
              centerRipple
            >
              <CreateIcon
                fontSize='large'
                className={`${styleClass.iconLargeSizeCustom}`}
              />
            </IconButton>
            <IconButton
              color='primary'
              className={`${styleClass.marginFixIcon} ${styleClass.outlineNone}`}
              onClick={onClickSave}
              disabled={disableSave}
              id='sabeButtonCharacterisation'
            >
              <SaveIcon
                fontSize='large'
                className={`${styleClass.iconLargeSizeCustom}`}
              />
            </IconButton>
            <IconButton
              color='primary'
              className={`${styleClass.marginFixIcon} ${styleClass.outlineNone}`}
              onClick={onClickClear}
              disabled={disableClear}
            >
              <ClearIcon
                fontSize='large'
                className={`${styleClass.iconLargeSizeCustom}`}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTabs;
