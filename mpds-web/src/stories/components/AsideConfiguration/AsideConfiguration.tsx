import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { FunctionComponent, useState } from "react";
// OUTSIDE COMPONENTS
import { makeStyles, IconButton, Typography } from "@material-ui/core";
import { Navbar, Nav } from "react-bootstrap";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

//ICONS
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
/* import Icon from './componentAssets/icon/icon'; */

interface AsideConfigurationProps {
  /**
   * Title at the top of the panel.
   */
  title?: string;
  /**
   * Content of the first tab.
   */
  tabOne?: React.ReactNode;
  /**
   * Content of the second tab.
   */
  tabTwo?: React.ReactNode;
  /**
   * Content of the third tab.
   */
  tabThree?: React.ReactNode;
  /**
   * handle click of each tab button.
   */
  clickTab?: () => void;
  /**
   * Title of the first button.
   */
  buttonOneTitle?: string;
  /**
   * Title of the second button.
   */
  buttonTwoTitle?: string;
  /**
   * Title of the third button.
   */
  buttonThreeTitle?: string;
  /**
   * Insert elements to the closed bar element.
   */
  closedBarContent?: React.ReactNode;
  /**
   * Handle click to toogle bar.
   */
  clickToogleBar?: () => void;
  /**
   * Insert tabs element.
   */
  tabs?: React.ReactNode;
  /**
   * Content inside of the bar.
   */
  openBarContent? : React.ReactNode;
  /**
   * Define the value of the prop to extend or close the bar.
   */
  isBarExtendedProp? : boolean;
}

 const AsideConfiguration: FunctionComponent<AsideConfigurationProps> = ({
  title = "Configuration",
  buttonOneTitle = 'One',
  buttonTwoTitle = 'Two',
  buttonThreeTitle = 'Three',
  tabOne= "I'm inside.",
  tabTwo = "",
  tabThree = "",
  clickToogleBar,
  clickTab,
  isBarExtendedProp = useState<any>(true), 
  tabs= <> <Button id={'buttonTabAside1'} style={{width: '100%', whiteSpace: "nowrap", fontFamily: 'Roboto Condensed', fontSize: 13, color: "#ffffff", backgroundColor: '#4CB3BA'}} onClick={clickTab}>{buttonOneTitle}</Button>
      <Button id={'buttonTabAside2'} style={{width: '100%', whiteSpace: "nowrap", fontFamily: 'Roboto Condensed', fontSize: 13}} onClick={clickTab}>{buttonTwoTitle}</Button>
      <Button id={'buttonTabAside3'} style={{width: '100%', fontFamily: 'Roboto Condensed', fontSize: 13, whiteSpace: 'nowrap'}} onClick={clickTab}>{buttonThreeTitle}</Button>
    </>,
  closedBarContent = <Button style={{minWidth: 34, minHeight: 34, width: 34,  height: 34, marginTop: 4}}  variant="contained" color="primary" href="#contained-buttons">
      <AirplanemodeActiveIcon />
    </Button>,
  openBarContent = <Nav style={{flexDirection: "column", display: "flex", paddingLeft: 0, listStyle: "none", position: "relative", height: 'calc(100% - 51px)', width: '100%'}}>
  <Typography style={{textAlign: "left", paddingLeft: 10, paddingTop: 5, paddingBottom: 5, fontWeight: 700}}>
    {title}
  </Typography>
  
  <div>
    <ButtonGroup style={{paddingLeft: 15, paddingRight: 15, width: "100%"}} color="primary" aria-label="outlined primary button group">
      {tabs}
    </ButtonGroup>
  </div>

  <div style={{overflow: 'auto', height: '100%'}}>
    {tabOne}
     {tabTwo}
    {tabThree}
  </div>
</Nav>
  
}) => {
  

  const useStyles = makeStyles((theme) => ({
    root: {
      "&.MuiButton-root":{
        width:16,
      },
      "&.MuiList-root": {
        position: "absolute",
        right: 0,
        left: 0,
        top: 120,
        [theme.breakpoints.up("sm")]: {
          top: 130,
        },
      },
    },
    positionFixed: {
      position: "fixed",
    },
    HeightOneHundred: {
      height: "100%",
    },
    WidthOneHundred: {
      width: "100%",
    },
    PositionFixed: {
      position: "fixed",
    },
    PositionAbsolute: {
      position: "absolute",
    },
    MenuContainer: {
      zIndex: 2,
      right: 0,
      width: "75%",
      overflowY: "scroll",
    },
    Menu: {
      zIndex: 2,
      width: "75%",
      background: "#FCFCFC",
      position: "fixed",
      right: 0,
    },
    BottomZero: {
      bottom: 0,
    },
    buttonLink: {
      color: "#3f51b5",
      width: 170,
      textAlign: "left",
      height: 40,
      lineHeight: 3,
    },
    textUppercase: {
      textTransform: "uppercase",
    },
    pl3: {
      paddingLeft: 10,
    },
    floatRight: {
      float: "right",
    },
    BackgroundSideBar: {
      background: "#FCFCFC",
    },
    HeightController: {
      [theme.breakpoints.between(0, 350)]: {
        maxHeight: 510,
        overflow: "scroll",
      },
      [theme.breakpoints.between(351, 400)]: {
        maxHeight: 580,
        overflow: "scroll",
      },
      [theme.breakpoints.between(401, 600)]: {
        maxHeight: 650,
        overflow: "scroll",
      },
    },
    PaperElevation: {
      boxShadow: "none",
      background: "unset",
      //color: mainText,
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    DisplayLgNone: {
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    borderExpandMenu: {
      borderStyle: "solid",
      borderColor: "#4949492a",
      borderBottom: 1,
    },
    py3: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    mx4: {
      marginRight: 15,
      marginLeft: 15,
    },
    textLeft: {
      textAlign: "left",
    },
    mt4: {
      marginTop: 15,
    },
    ml4: {
      marginLeft: 15,
    },
    mr3: {
      marginRight: 10,
    },
    mtMd4: {
      [theme.breakpoints.up("md")]: {
        marginTop: 15,
      },
    },
    mrMd4: {
      [theme.breakpoints.up("md")]: {
        marginRight: 15,
      },
    },
    p3: {
      padding: 15,
    },
    px3:{
      paddingLeft: 15,
      paddingRight: 15
    },
    py2:{
      paddingTop: 5,
      paddingBottom: 5
    },
    p4: {
      padding: 20,
    },
    pb4: {
      paddingBottom: 15,
    },
  
    pl5: {
      paddingLeft: 20,
    },
  
    mb5: {
      marginBottom: 20,
    },
  
    ml5: {
      marginLeft: 20,
    },
  
    mr4: {
      marginRight: 15,
    },
  
    dBlock: {
      display: "block",
    },
    breakText: {
      wordBreak: "break-all",
    },
    instDropdown: {
      color: "#4CB3BA",
    },
    cursorPointer: {
      cursor: "pointer",
    },
    flexColumn: {
      flexDirection: "column",
    },
    institutionItem: {
      fontSize: 16,
      color: "#494949",
    },
    fontWeightBold: {
      fontWeight: 700,
    },
    noPaddingY: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    m0: {
      margin: 0,
    },
    dLgNone: {
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    mr1: {
      marginRight: 2.5,
    },
    idDropdown: {
      lineHeight: 1.2,
      color: "#494949",
    },
    idDropdownParent: {
      "&:hover": {
        color: "#4CB3BA",
      },
    },
    fitPhoto: {
      objectFit: "cover",
    },
    paddingVerticalNav: {
      [theme.breakpoints.up("lg")]: {
        paddingLeft: 60,
      },
    },
    centerNavbar: {
      textAlign: "center",
      zIndex: 104
    },
    verticalNav: {
      "&.navbar": {
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: "column",
        width: 60,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 100001,
        background: "#fcfcfc",
      },
    },
    floatLeft: {
      float: "left",
    },
    dNone: {
      display: "none",
    },
    dLgFlex: {
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    navContainer: {
      flexDirection: "column",
      display: "flex",
      paddingLeft: 0,
      listStyle: "none",
      position: "relative",
        "&.navbar-nav":{
          flexDirection: "column",
        }
    },
    dFlex: {
      display: "flex",
    },
    navLinkSize: {
      padding: 10,
      boxSizing: "border-box",
      textDecoration: "none",
      color: "#3f51b5",
    },
    selectedNavTab: {
      borderLeft: 3,
      borderTop: 0,
      borderBottom: 0,
      borderRight: 0,
      borderStyle: "solid"
    },
    extendedMenu: {
      "&.navbar": {
        padding: 0,
        flexDirection: "column",
        width: 310,
        zIndex: 100001,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
      },
    },
    fontSizeLarge: {
      fontSize: 30,
    },
    sizeSmall: {
      fontSize: 18,
    },
    toggleIcon: {
      height: 36,
      width: 36,
      "&:hover":{
        color: "#4CB3BA",
      },
    },
    centerMargin: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    robotoCondensedButtons:{
      fontFamily: 'Roboto Condensed',
      fontSize: 13,
      whiteSpace: 'nowrap'
    },
    activeButton:{
      color: "#ffffff",
      backgroundColor: '#4CB3BA',
      "&:hover":{
        backgroundColor: '#019ea9'
      }
    },
    heightAdjustment:{
      height: 'calc(100% - 51px)',
    },
    sidenavLeft: {
      whiteSpace: 'nowrap',
      borderRadius: '8px 0px 0px 8px',
      left: 0,
      zIndex: 1,
      overflowX: 'hidden',
      padding: '10px 12px',
      fontFamily: 'Open Sans',
      cursor: 'default',
    },
    toggleButton:{
      display: 'block',
      width: '100%',
      textAlign: 'right',
      color: "#4CB3BA",
      cursor: 'pointer',
      marginBottom: 8,
      "&:hover":{
        color: "#4CB3BA",
      }
    },
    marginIcon:{
      margin: '0 -8px',
    },
    w100: {
      width: '100%'
    },
    textNowrap:{
      whiteSpace: "nowrap"
    },
    closedBarButton:{
      minWidth: 34, 
      minHeight: 34,
      width: 34, 
      height: 34,
      marginTop: 4,
    },
    h100:{
      height: '100%'
    },
    overflowAuto:{
      overflow: 'auto'
    }
  }));
  
  const styleClass = useStyles();
  
  const [isBarExtended] = useState({isBarExtendedProp}) 

  return (
    <>
      <div
        className={`${styleClass.centerNavbar} 
          ${styleClass.floatRight}
          ${styleClass.HeightOneHundred}`}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${styleClass.dLgFlex} ${styleClass.HeightOneHundred}
            ${
              isBarExtended
                ? `${styleClass.extendedMenu}`
                : `${styleClass.verticalNav}`
            } `}>
          <div>
            <IconButton
              color="primary"
              onClick={clickToogleBar}
              className={`${styleClass.sidenavLeft} ${styleClass.toggleButton} ${styleClass.toggleIcon} ${styleClass.sizeSmall} ${styleClass.mt4} ${isBarExtended ? `${styleClass.mt4} ${styleClass.ml4}` : `${styleClass.centerMargin}`}`}
              size="small"
              aria-label="f3m">
                {isBarExtended ? (
                  <>
                    {/* <Icon icon={"angle-right"} size={14} />
                    <Icon icon={"angle-right"} size={14} className={styleClass.marginIcon} />
                    <Icon icon={"angle-right"} size={14} /> */}
                  </>
                ) : (
                  <>
                    {/* <Icon icon={"angle-left"} size={14} />
                    <Icon icon={"angle-left"} size={14} className={styleClass.marginIcon} />
                    <Icon icon={"angle-left"} size={14} /> */}
                  </>
                )}
            </IconButton>
          </div>
          {isBarExtended ?
            openBarContent
          : <>
            {closedBarContent}
          </>}       
        </Navbar>
      </div>
    </>
  );
};

export default AsideConfiguration;
