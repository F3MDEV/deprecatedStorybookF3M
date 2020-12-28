import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Image from 'react-bootstrap/Image'
import Tooltip from '@material-ui/core/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';

//CSS, STYLES & MEDIA ASSETS
import PatientIcon from '../../utils/account-circle.svg';
import "../Module_Wounds/Data_grid/grid.scss";
import { fontWeight } from '@material-ui/system';

//CSS
import "./UsersGrid.scss"

function desc(a, b, orderBy) {
  if (b!== null && a !== null){
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const { t } = useTranslation();
  const headCells = [
    { id: 'userMenu', numeric: false, disablePadding: true, label: '' },
    { id: 'name', numeric: false, disablePadding: false, label: t('Name') },
    { id: 'rowKey', numeric: false, disablePadding: false, label: t('Email') },
    { id: 'specialty', numeric: false, disablePadding: false, label: t('Speciality') },
    { id: 'profile', numeric: false, disablePadding: false, label: t('Profile') },
    //{ id: 'state', numeric: false, disablePadding: false, label: t('State') },
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order.toLowerCase() : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id} //apenas apresenta a seta no campo que está aplicada a ordenação
              direction={order.toLowerCase()}
              className={classes.label, classes.icon}
              //icon
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

    marginTop: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  label: {
    fontSize: 12
  },
  fontSizeGrid: {
    fontSize: 12,
  },
  icon: {
    fontSize: 13,
    fontWeight: 700
  },
  inputRoot: {
    "&.MuiInput-underline:before": {
      borderBottom: "none",
    }
  },
  endAdornment:{
    "&.MuiAutocomplete-endAdornment": {
      display: "none",
    }
  },
  tagSizeSmall:{
    "&.MuiAutocomplete-tagSizeSmall": {
      marginTop: 5,
      marginLeft: 0
    }
  }
}));

const useStylesTooltip = makeStyles(theme => ({
  tooltip: {
    maxWidth: 500,//'none'
    //backgroundColor: theme.palette.common.white,
    font: "Nunito",
    color: "#494949",
    backgroundColor: "white",
    minWidth: 150,
    border: "solid",
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    fontSize: 12,
    margin: theme.spacing(1),
    marginLeft: 15,
    /* boxShadow: theme.shadows[1], */
  },
  arrow: {
    color: theme.palette.primary.main,
    top: 25,
  },
  tooltipArrow: {
    marginRight: -125,
  }
}));

export default function EnhancedTable(props) {
  const { t } = useTranslation();
  const listUsers = props.listUsers || [];
  const institution = props.institution;
  
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc'); //React.useState(store.wounds.Order.toLowerCase());
  const [orderBy, setOrderBy] =React.useState('name'); //React.useState(store.wounds.PropertyOrder);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0); //React.useState(store.wounds.Page)
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //React.useState(store.wounds.NumberRowsPerPage);

  const classesTooltip = useStylesTooltip()

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = listUsers.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /* const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }; */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, listUsers.length - page * rowsPerPage);
  // Se não tiver 2 linhas, o menu de opções aparece cortado.
  const emptyRows = Math.min(rowsPerPage, listUsers.length - page * rowsPerPage) === 1 ? 1 : 0;

  const selectUser = userEmail => event => {
    event.stopPropagation();
    if (userEmail !== "") {
      props.selectUser(userEmail)
    }
  };

  const resetPasswordUser = userEmail => event => {
    event.stopPropagation();
    if (userEmail !== "") {
      props.resetPasswordUser(userEmail)
    }
  }

  const deleteUser = (userRowKey, userName, institutionRowKey, institutionName) => event => {
    event.stopPropagation();
    props.deleteUser(userRowKey, userName, institutionRowKey, institutionName)
  }

  const CustomToggleMenu = React.forwardRef(({ children, onClick }, ref) => (
    <a
        className="text-decoration-none font-weight-bold d-block"
        ref={ref}
        href="/"
        onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        }}
    >
        <IconButton
            className= "outline-none"
            centerRipple={true}
            >
            <MoreVertIcon />
        </IconButton>
    </a>
));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listUsers.length} 
            />
            <TableBody>
              {stableSort(listUsers, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const isItemSelected = isSelected(user.name);
                  
                  return (
                    <TableRow
                      hover
                      classes={classes.MuiTableRow}
                      onClick={selectUser(user.rowKey)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.rowKey}
                      selected={isItemSelected}
                    >
                      <TableCell className="p-2 table-cell-custom-size" align="left" >
                          <Dropdown>
                              <Dropdown.Toggle as={CustomToggleMenu} ></Dropdown.Toggle>
                              <Dropdown.Menu className="py-3 pr-5 dropdown-menu-user-grid ">
                                  <Dropdown.Item as="button" className="institution-item nunito-regular font-size-16-px my-auto py-2 outline-none" onClick={selectUser(user.rowKey)}>
                                      <CreateIcon className="custom-icon-font-size"/>
                                      <span className="ml-3 pt-2">{t('EditUser')}</span>
                                  </Dropdown.Item>
                                  <Dropdown.Item as="button" className="institution-item nunito-regular font-size-16-px my-auto py-2 outline-none" onClick={resetPasswordUser(user.rowKey)}>
                                      <AutorenewIcon className="custom-icon-font-size"/>
                                      <span className="ml-3 pt-2">{t('ResetPass')}</span>
                                  </Dropdown.Item>
                                  <Dropdown.Item as="button" className="institution-item nunito-regular font-size-16-px my-auto py-2 outline-none" 
                                    onClick={deleteUser(user.rowKey, user.name, institution.rowKey, institution.name)}
                                    disabled={props.actualUser === user.rowKey} //&& props.actualInstitution === institution.rowKey}
                                  >
                                     <DeleteIcon className="custom-icon-font-size"/>
                                     <span className="ml-3 pt-2">{t('DeleteUser')}</span>
                                  </Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                      </TableCell>
                      <Tooltip disableFocusListener title={user.name} classes={classesTooltip} arrow placement='bottom-start' enterDelay={300}>
                        <TableCell component="td" scope="row" className="font-weight-bold name-width" >
                              <Box className="d-flex" align="middle">
                                  <Image className={"text-left mr-3 my-auto flex-shrink-0 fit-photo" + (user.photoUri === "" || user.photoUri == null ? "" : " border-img-usr")} 
                                    width="30" height="30" roundedCircle 
                                    src={user.photoUri === "" || user.photoUri == null ? PatientIcon : user.photoUri}
                                    onError={(event) => {event.target.src = PatientIcon; event.target.className = 'text-left mr-3 my-auto flex-shrink-0'}}
                                  ></Image>
                                  <Typography noWrap className="my-auto font-weight-bold" classes={{ root: classes.fontSizeGrid }}>{user.name}</Typography>
                              </Box>
                        </TableCell>
                      </Tooltip>
                      <TableCell align="left">{user.rowKey}</TableCell>
                      <TableCell align="left">{user.specialty}</TableCell>
                      <TableCell align="left" className="tags-parent">
                        <span key={"perfil_user_"+index} className="tag-profile px-4 py-2">{user.profile.name}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                < TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': t('previousPage'),
              'title': t('previousPage'),
              'style': {'outline': 'none'}
            }}
            nextIconButtonProps={{
              'aria-label': t('nextPage'),
              'title': t('nextPage'),
              'style': {'outline': 'none'}
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={t('RowsPerPage')}
          />
        </div>
      </Paper>
    </div >
  );
}
