import * as React from 'react';
import { FunctionComponent, useState } from 'react';

// OUTSIDE COMPONENTS
import { makeStyles, IconButton } from '@material-ui/core';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HealingIcon from '@material-ui/icons/Healing';

export interface VerticalNavBarProps {
  /**
   * Array that has all the information about the section items: link, icon and itemTitle.
   */
  sectionsItems?: Array<{ link: string; icon: string; itemTitle: string }>;
  /**
   * Boolean value of the bar extension state.
   */
  barExtended?: boolean;
  /**
   * Background color of the selected nav.
   */
  selectedNavTabBackground?: string;
  /**
   * Border color of the selected nav.
   */
  selectedNavTabBorderColor?: string;
  /**
   * onClick to toogle the menu.
   */
  onClickToogleIcon?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Active ou disable the fixed position of the component. NOTE: This prop was created to fix a bug in the .mdx files.
   */
  isPositionFixed?: boolean;
}

const itemDashboard = {
  link: '/',
  icon: (
    <IconButton
      color='primary'
      size='small'
      aria-label='f3m'
      className='align-text-top'
      /* onClick={this.onClickDashboard} */
    >
      <DashboardIcon fontSize='large'></DashboardIcon>
    </IconButton>
  ),
  itemTitle: (
    <Box
      fontSize={14}
      fontWeight={700}
      fontFamily='Nunito'
      style={{
        paddingLeft: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        textTransform: 'uppercase',
        color: '#3f51b5',
        width: 170,
        textAlign: 'left',
        height: 40,
        lineHeight: 3
      }}
      /* onClick={this.onClickDashboard} */
    >
      Dashboard
    </Box>
  )
};

const itemSettings = {
  link: '/settings',
  icon: (
    <IconButton
      color='primary'
      size='small'
      aria-label='f3m'
      /* onClick={this.onClickSettingsHome} */
    >
      <SettingsIcon fontSize='large' />
    </IconButton>
  ),
  itemTitle: (
    <Box
      fontSize={14}
      fontWeight={700}
      fontFamily='Nunito'
      style={{
        paddingLeft: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        textTransform: 'uppercase',
        color: '#3f51b5',
        width: 170,
        textAlign: 'left',
        height: 40,
        lineHeight: 3
      }}
      /* onClick={this.onClickSettingsHome} */
    >
      {/* {t("navBar.Admin")} */}
      Settings
    </Box>
  )
};

const itemWounds = {
  link: '/wounds',
  icon: (
    <IconButton
      color='primary'
      size='small'
      aria-label='f3m'
      /* onClick={this.onClickWounds} */
    >
      <HealingIcon fontSize='large'></HealingIcon>
    </IconButton>
  ),
  itemTitle: (
    <Box
      fontSize={14}
      fontWeight={700}
      fontFamily='Nunito'
      style={{
        paddingLeft: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        textTransform: 'uppercase',
        color: '#3f51b5',
        width: 170,
        textAlign: 'left',
        height: 40,
        lineHeight: 3
      }}
      // onClick={this.onClickWounds}
    >
      {/* {t("navBar.wounds")} */}
      WOUNDS
    </Box>
  )
};

let tabs = [itemDashboard, itemSettings, itemWounds];

export const VerticalNavBar: FunctionComponent<VerticalNavBarProps> = ({
  // classes,
  // id,
  sectionsItems = tabs,
  barExtended = false,
  selectedNavTabBackground = '#3f51b534',
  selectedNavTabBorderColor = '#3f51b5',
  onClickToogleIcon,
  isPositionFixed = true
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '&.MuiList-root': {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 120,
        [theme.breakpoints.up('sm')]: {
          top: 130
        }
      }
    },
    positionFixed: {
      position: 'fixed'
    },
    HeightOneHundred: {
      height: '100%'
    },
    WidthOneHundred: {
      width: '100%'
    },
    PositionFixed: {
      position: 'fixed'
    },
    PositionAbsolute: {
      position: 'absolute'
    },
    MenuContainer: {
      zIndex: 2,
      right: 0,
      width: '75%',
      overflowY: 'scroll'
    },
    Menu: {
      zIndex: 2,
      width: '75%',
      background: '#FCFCFC',
      position: 'fixed',
      right: 0
    },
    BottomZero: {
      bottom: 0
    },
    buttonLink: {
      color: '#3f51b5',
      width: 170,
      textAlign: 'left',
      height: 40,
      lineHeight: 3
    },
    textUppercase: {
      textTransform: 'uppercase'
    },
    myAuto: {
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    pl3: {
      paddingLeft: 10
    },
    FloatRight: {
      floatRight: 'right'
    },
    BackgroundSideBar: {
      background: '#FCFCFC'
    },
    HeightController: {
      [theme.breakpoints.between(0, 350)]: {
        maxHeight: 510,
        overflow: 'scroll'
      },
      [theme.breakpoints.between(351, 400)]: {
        maxHeight: 580,
        overflow: 'scroll'
      },
      [theme.breakpoints.between(401, 600)]: {
        maxHeight: 650,
        overflow: 'scroll'
      }
    },
    PaperElevation: {
      boxShadow: 'none',
      background: 'unset',
      //color: mainText,
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    DisplayLgNone: {
      [theme.breakpoints.up('lg')]: {
        display: 'none'
      }
    },
    borderExpandMenu: {
      borderStyle: 'solid',
      borderColor: '#4949492a',
      borderBottom: 1
    },
    py3: {
      paddingTop: 10,
      paddingBottom: 10
    },
    mx4: {
      marginRight: 15,
      marginLeft: 15
    },
    textLeft: {
      textAlign: 'left'
    },
    mt4: {
      marginTop: 15
    },
    ml4: {
      marginLeft: 15
    },
    mr3: {
      marginRight: 10
    },
    mtMd4: {
      [theme.breakpoints.up('md')]: {
        marginTop: 15
      }
    },
    mrMd4: {
      [theme.breakpoints.up('md')]: {
        marginRight: 15
      }
    },
    p3: {
      padding: 15
    },
    p4: {
      padding: 20
    },
    pb4: {
      paddingBottom: 15
    },

    pl5: {
      paddingLeft: 20
    },

    mb5: {
      marginBottom: 20
    },

    ml5: {
      marginLeft: 20
    },

    mr4: {
      marginRight: 15
    },

    dBlock: {
      display: 'block'
    },
    breakText: {
      wordBreak: 'break-all'
    },
    instDropdown: {
      color: '#4CB3BA'
    },
    cursorPointer: {
      cursor: 'pointer'
    },
    flexColumn: {
      flexDirection: 'column'
    },
    institutionItem: {
      fontSize: 16,
      //fontfamily: ""Nunito, sans-serif",
      color: '#494949'
    },
    fontWeightBold: {
      fontWeight: 700
    },
    noPaddingY: {
      paddingTop: 0,
      paddingBottom: 0
    },
    m0: {
      margin: 0
    },
    dLgNone: {
      [theme.breakpoints.up('lg')]: {
        display: 'none'
      }
    },
    mr1: {
      marginRight: 2.5
    },
    idDropdown: {
      lineHeight: 1.2,
      color: '#494949'
    },
    idDropdownParent: {
      '&:hover': {
        color: '#4CB3BA'
      }
      /*   &:hover {
        .id-dropdown{
          color: var(--color-primary);
        }
        .inst-dropdown {
          color: var(--color-primary);
        }
      } */
    },
    fitPhoto: {
      objectFit: 'cover'
    },
    paddingVerticalNav: {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 60
      }
    },
    centerNavbar: {
      textAlign: 'center',
      zIndex: 10004
    },
    verticalNav: {
      '&.navbar': {
        paddingLeft: 0,
        flexDirection: 'column',
        width: 60,
        zIndex: 100001,
        background: '#fcfcfc',
        boxShadow: '0px 14px 20px rgb(76 179 186 / 20%)'
      }
    },
    floatLeft: {
      float: 'left'
    },
    dNone: {
      display: 'none'
    },
    dLgFlex: {
      [theme.breakpoints.up('lg')]: {
        display: 'flex'
      }
    },
    navContainer: {
      flexDirection: 'column',
      display: 'flex',
      paddingLeft: 0,
      listStyle: 'none',
      position: 'relative'
    },
    dFlex: {
      display: 'flex'
    },
    navLinkSize: {
      padding: 10,
      boxSizing: 'border-box',
      textDecoration: 'none',
      color: '#3f51b5'
    },
    selectedNavTab: {
      background: selectedNavTabBackground,
      borderLeft: 3,
      borderTop: 0,
      borderBottom: 0,
      borderRight: 0,
      borderStyle: 'solid',
      borderColor: selectedNavTabBorderColor
    },
    extendedMenu: {
      '&.navbar': {
        paddingLeft: 0,
        flexDirection: 'column',
        width: 230,
        zIndex: 100001,
        background: '#fcfcfc',
        alignItems: 'flex-start',
        boxShadow: '0px 14px 20px rgb(63 81 181 / 20%)'
      }
    },
    fontSizeLarge: {
      fontSize: 30
    },
    sizeSmall: {
      fontSize: 18
    },
    toggleIcon: {
      height: 36,
      width: 36
    },
    centerMargin: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }));

  const styleClass = useStyles();

  const [
    isBarExtended
    //setIsBarExtended
  ] = useState(barExtended);

  return (
    <>
      <Router>
        <div
          className={`${styleClass.centerNavbar} ${styleClass.floatLeft} ${
            styleClass.HeightOneHundred
          } ${isPositionFixed ? styleClass.PositionFixed : ''}`}
        >
          <Navbar
            collapseOnSelect
            expand='lg'
            className={`${styleClass.dLgFlex} ${styleClass.HeightOneHundred}
             ${
               isBarExtended ? `${styleClass.extendedMenu}` : `${styleClass.verticalNav}`
             } `}
          >
            <IconButton
              color='primary'
              className={`${styleClass.toggleIcon} ${styleClass.sizeSmall} ${
                styleClass.mt4
              } ${
                isBarExtended
                  ? `${styleClass.mt4} ${styleClass.ml4}`
                  : `${styleClass.centerMargin}`
              }`}
              size='small'
              aria-label='f3m'
              onClick={onClickToogleIcon}
            >
              {isBarExtended ? (
                <ClearIcon fontSize='large' className={`${styleClass.fontSizeLarge}`} />
              ) : (
                <MenuIcon fontSize='large' className={`${styleClass.fontSizeLarge}`} />
              )}
            </IconButton>

            <Nav
              className={`${styleClass.myAuto} ${styleClass.navContainer} ${styleClass.WidthOneHundred}`}
            >
              {sectionsItems.map((item: any) => (
                <NavLink
                  key={item.link}
                  className={`${styleClass.navLinkSize} ${styleClass.dFlex} ${styleClass.WidthOneHundred}`}
                  isActive={(match: any, location: { pathname: string }) => {
                    let res = false;
                    if (!match) {
                      res = false;
                    }
                    if (
                      location.pathname === item.link ||
                      (location.pathname === '/PatientDetails' && item.link === '/wounds')
                    ) {
                      res = true;
                    }
                    return res;
                  }}
                  activeClassName={`${styleClass.selectedNavTab}`}
                  to={item.link}
                >
                  {item.icon}
                  {isBarExtended ? <ListItemIcon>{item.itemTitle}</ListItemIcon> : ''}
                </NavLink>
              ))}
            </Nav>
          </Navbar>
        </div>
      </Router>
    </>
  );
};

export default VerticalNavBar;
