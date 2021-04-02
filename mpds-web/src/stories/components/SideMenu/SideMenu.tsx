import * as React from 'react';
import { FunctionComponent, useState, ChangeEvent, Fragment } from 'react';

// OUTSIDE COMPONENTS
import { makeStyles, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Image from 'react-bootstrap/Image';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import HealingIcon from '@material-ui/icons/Healing';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import PatientIcon from '@material-ui/icons/AccountCircle';
import { BackgroundProperty } from '@material-ui/system/node_modules/csstype/index';

import { PropsFunc } from '@material-ui/styles/withStyles/withStyles';

export interface MenuSliderF3MProps {
  /**
   * Array that has all the information about the section items: link, icon and itemTitle.
   */
  sectionsItems?: Array<{ link: string; icon: string; itemTitle: string }>;
  /**
   * Array of objects that will build the links inside of the user accordion.
   */
  userLinks?: Array<{
    classNames: string;
    onClick: React.MouseEventHandler<any>;
    name: string;
  }>;
  /**
   * onClick to close the menu.
   */
  onClickCloseIcon?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Name the main link to edit.
   */
  editLinkList?: string;
  /**
   * onClick of the edit link.
   */
  editLinkListClick?: React.MouseEventHandler<any>;
  /**
   * Array that has all the info of the links that can be selected.
   */
  listOfLinks?: Array<{ rowKey: any; name: string }>;
  /**
   * The selection values of the sections links.
   */
  selectedItemList?: boolean;
  /**
   * The boolean value of the expanded state of the panel list of links.
   */
  expandedPanelListOfLinks?: boolean;
  /**
   * onChange of the expanded panel list of links
   */
  onChangeExpandedPanelListOfLinks?: (
    event: ChangeEvent<{}>,
    expanded: boolean
  ) => void | undefined;
  /**
   * Color of the icons in the expanded panels
   */
  expandedIconColor?:
    | 'inherit'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'action'
    | 'error'
    | undefined;
  /**
   * * The name of the selected link.
   */
  linkSelectedName?: string;
  /**
   * Color of the selected link.
   */
  selectedLinkColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'initial'
    | 'textPrimary'
    | 'textSecondary'
    | undefined;
  /**
   * onClick of the links.
   */
  onClickLinkList?: React.MouseEventHandler<any>;
  /**
   * Name of the userName.
   */
  userName?: string;
  /**
   * Color text of the userName.
   */
  userNameColor?: string;
  /**
   * Speciality of the user.
   */
  userSpeciality?: string;
  /**
   * Text color of user speciality.
   */
  userSpecialityColor?: string;
  /**
   * Text color of the user links.
   */
  userLinksColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'initial'
    | 'textPrimary'
    | 'textSecondary'
    | undefined;
  /**
   * Classes of the userImage.
   */
  userImageClasses?: string;
  /**
   * Boolean value of the image existence.
   */
  hasImage?: boolean;
  /**
   * User photo path.
   */
  pathUserPhoto?: string;
  /**
   * Default user photo.
   */
  defaultPathUserPhoto?: any;
  /**
   * Background color of the menu
   */
  menuColor?: string;
  /**
   * Boolean value of the menu state expansion.
   */
  isMenuOpenActive?: boolean;
  /**
   * Text color of the links.
   */
  linksItemsTextColor?: string;
  /**
   * Active or disable the fixed position of the menu. NOTE: This prop was created to fix a bug in the .mdx files.
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
      /* className="align-text-top" */
      /* onClick={this.onClickDashboard} */
    >
      <DashboardIcon fontSize='large'></DashboardIcon>
      {/* <Image fluid className="my-auto" src={DashboardIcon} alt="logo" /> */}
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
        color: '#',
        width: 183,
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

export const MenuSliderF3M: FunctionComponent<MenuSliderF3MProps> = ({
  sectionsItems = tabs,
  userLinks = [
    {
      classNames: '',
      onClick: console.log('Click!'),
      name: 'Settings'
    },
    {
      classNames: '',
      onClick: console.log('Click!'),
      name: 'Log Out'
    }
  ],
  onClickCloseIcon,
  editLinkList = 'Edit',
  editLinkListClick,
  listOfLinks = [
    {
      rowKey: 1,
      name: 'Link1'
    },
    {
      rowKey: 2,
      name: 'Link2'
    },
    {
      rowKey: 3,
      name: 'Link3'
    }
  ],
  selectedItemList,
  expandedPanelListOfLinks,
  onChangeExpandedPanelListOfLinks,
  expandedIconColor = 'inherit',
  linkSelectedName = 'SelectedLink',
  selectedLinkColor = 'textPrimary',
  onClickLinkList,
  userName = 'Jane Doe',
  userSpeciality = 'Nurse',
  userImageClasses,
  hasImage = false,
  menuColor = '#FCFCFC',
  pathUserPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/440px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
  defaultPathUserPhoto = 'https://icons-for-free.com/iconfiles/png/512/timer+icon-1320183326214705150.png',
  isMenuOpenActive = true,
  linksItemsTextColor = '#494949',
  userNameColor = '#494949',
  userSpecialityColor = '#494949',
  userLinksColor = 'textPrimary',
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
        },
        [theme.breakpoints.between(0, 390)]: {
          overflow: 'scroll',
          height: 243
        },
        [theme.breakpoints.between(0, 330)]: {
          overflow: 'scroll',
          height: 155
        }
      }
    },
    underlineHover: {
      '&:hover': {
        textDecoration: 'none'
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
      backgroundColor: menuColor as string,
      right: 0
    },
    BottomZero: {
      bottom: 0
    },
    buttonLink: {
      color: '#',
      width: 183,
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
      float: 'right'
    },
    BackgroundSideBar: {
      backgroundColor: menuColor as string
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
      borderColor: '#4949492a',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid'
    },
    py3: {
      paddingTop: 10,
      paddingBottom: 10
    },
    py4: {
      paddingTop: 15,
      paddingBottom: 15
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
    cursorPointer: {
      cursor: 'pointer'
    },
    flexColumn: {
      flexDirection: 'column'
    },
    institutionItem: {
      fontSize: 16,
      //fontfamily: ""Nunito, sans-serif",
      color: linksItemsTextColor as string
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
    fitPhoto: {
      objectFit: 'cover'
    },
    borderImageHeader: {
      borderColor: '#DCDCDC',
      border: 2
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
    flexDirectionColumn: {
      flexDirection: 'column'
    },
    dFlex: {
      display: 'flex'
    },
    navLinkSize: {
      width: 60,
      height: 60,
      padding: 10
      /* "&.selected": {
        background: map-get($theme-colors, primary-transparent);
        border-left: 0.3rem solid map-get($theme-colors, primary);
      } */
    },
    eraseMarginY: {
      '&.Mui-expanded': {
        marginLeft: 15,
        marginRight: 15,
        '&:last-child': {
          marginBottom: 16
        }
      }
    },
    fontRoboto: {
      fontFamily: 'Roboto'
    }
  }));

  const styleClass = useStyles();

  const [
    isMenuOpen
    // setIsMenuOpen
  ] = useState(isMenuOpenActive);

  // let listOfInstitutions =
  //   JSON.parse(this.props.login.listOfInstitutions) || [];

  // sort by name
  listOfLinks.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <>
      <div
        className={
          isMenuOpen
            ? ''
            : `${styleClass.HeightOneHundred} ${styleClass.paddingVerticalNav}`
        }
      >
        {isMenuOpen ? (
          <div
            className={`${styleClass.PositionFixed} ${styleClass.MenuContainer} ${styleClass.HeightOneHundred}`}
          >
            <div
              className={`${styleClass.HeightOneHundred} ${
                isPositionFixed ? styleClass.PositionFixed : ''
              } ${styleClass.Menu} ${styleClass.PositionAbsolute} ${
                styleClass.BottomZero
              }`}
            >
              <div>
                <IconButton
                  size='small'
                  className={`${styleClass.FloatRight} ${styleClass.mt4} ${styleClass.mr3} ${styleClass.mtMd4} ${styleClass.mrMd4}`}
                  onClick={onClickCloseIcon}
                >
                  <ClearIcon fontSize='large' />
                </IconButton>
                <List className={`${styleClass.root}`}>
                  {sectionsItems.map((item: any) => (
                    <ListItem
                      button
                      className={`${styleClass.py4}`}
                      selected={selectedItemList}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.itemTitle} />
                    </ListItem>
                  ))}
                </List>

                <div
                  className={`${styleClass.PositionAbsolute} ${styleClass.BottomZero} ${styleClass.WidthOneHundred} ${styleClass.BackgroundSideBar} ${styleClass.HeightController}`}
                >
                  <ExpansionPanel
                    className={`${styleClass.DisplayLgNone} ${styleClass.borderExpandMenu} ${styleClass.eraseMarginY} ${styleClass.py3} ${styleClass.mx4} ${styleClass.PaperElevation}`}
                    expanded={expandedPanelListOfLinks}
                    onChange={onChangeExpandedPanelListOfLinks}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon color={expandedIconColor} />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <Box
                        fontFamily='Roboto'
                        fontWeight={700}
                        fontSize={18}
                        color={selectedLinkColor}
                        className={`${styleClass.dBlock} ${styleClass.breakText}`}
                      >
                        {linkSelectedName}
                      </Box>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                      className={`${styleClass.flexColumn} ${styleClass.noPaddingY} ${styleClass.pb4} ${styleClass.pl5} ${styleClass.ml5}`}
                    >
                      <Link
                        className={`${styleClass.underlineHover} ${styleClass.institutionItem} ${styleClass.dBlock} ${styleClass.py3} ${styleClass.cursorPointer}`}
                        onClick={editLinkListClick}
                      >
                        {editLinkList}
                      </Link>
                      {listOfLinks.map((item) => (
                        <Fragment key={item.rowKey}>
                          <Link
                            className={`${styleClass.underlineHover} ${styleClass.cursorPointer} ${styleClass.fontWeightBold} ${styleClass.institutionItem} ${styleClass.py3} ${styleClass.breakText}`}
                            key={item.rowKey}
                            onClick={onClickLinkList}
                          >
                            {item.name}
                          </Link>
                        </Fragment>
                      ))}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>

                  <ExpansionPanel
                    className={`${styleClass.dLgNone} ${styleClass.borderExpandMenu} ${styleClass.py3} ${styleClass.eraseMarginY} ${styleClass.mx4} ${styleClass.mb5} ${styleClass.PaperElevation}`}
                    /* expanded={this.state.isOpenExpansionUser}
                    onChange={(v) => this.onChangeExpandedUser(v)} */
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <Image
                        id='bannerImage2'
                        className={`${userImageClasses} ${styleClass.mr4} ${styleClass.myAuto} ${styleClass.fitPhoto} ${styleClass.borderImageHeader}`}
                        roundedCircle
                        width='45'
                        height='45'
                        src={!hasImage ? defaultPathUserPhoto : pathUserPhoto}
                        /* onError={(event) => {
                          event.target.src = PatientIcon;
                          event.target.className = `${styleClass.mr4} ${styleClass.myAuto}`;
                        }} */
                      ></Image>
                      <div
                        className={`${styleClass.textLeft} ${styleClass.mr1} ${styleClass.myAuto}`}
                      >
                        <Box
                          fontFamily='Roboto'
                          fontWeight={700}
                          fontSize={18}
                          className={`${styleClass.dBlock}`}
                          color={userNameColor as string}
                        >
                          {userName}
                        </Box>
                        <Box
                          fontFamily='Roboto'
                          fontSize={18}
                          className={`${styleClass.idDropdown} ${styleClass.m0}`}
                          color={userSpecialityColor as string}
                        >
                          {userSpeciality}
                        </Box>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                      className={`${styleClass.noPaddingY} ${styleClass.pb4} ${styleClass.pl5} ${styleClass.ml5} ${styleClass.flexColumn}`}
                    >
                      {userLinks.map((item) => (
                        <Link
                          className={`${styleClass.underlineHover} ${styleClass.fontRoboto} ${item.classNames} ${styleClass.institutionItem} ${styleClass.dBlock} ${styleClass.py3} ${styleClass.cursorPointer}`}
                          onClick={item.onClick}
                          color={userLinksColor}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default MenuSliderF3M;
