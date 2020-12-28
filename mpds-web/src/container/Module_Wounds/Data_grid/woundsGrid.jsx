import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import 'moment-timezone';
import Button from '@material-ui/core/Button';
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
import Image from 'react-bootstrap/Image';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import emptyStateMajor from '../../../utils/empty_state_geral.svg';

//CSS, STYLES & MEDIA ASSETS
import PatientIcon from '../../../utils/account-circle.svg';
import './grid.scss';
import { fontWeight } from '@material-ui/system';
import { woundsTab } from '../../../utils/constants';
import variables from '../../../assets/bootstrap/scss/_variables.scss';

//Scss variable
const { primaryFont } = variables;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
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
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const { t } = useTranslation();
  const headCells = [
    { id: 'Name', numeric: false, disablePadding: false, label: t('WoundsGrid.Name') },
    { id: 'Type', numeric: false, disablePadding: false, label: t('WoundsGrid.Type') },
    {
      id: 'Identification',
      numeric: false,
      disablePadding: false,
      label: t('WoundsGrid.SNS')
    },
    { id: 'Room', numeric: true, disablePadding: false, label: t('WoundsGrid.Room') },
    { id: 'Bed', numeric: true, disablePadding: false, label: t('WoundsGrid.Bed') },
    {
      id: 'LastInterventionType',
      numeric: false,
      disablePadding: false,
      label: t('WoundsGrid.WoundType')
    },
    {
      id: 'LastIntervention',
      numeric: true,
      disablePadding: false,
      label: t('WoundsGrid.WoundLastDate')
    },
    {
      id: 'NextIntervention',
      numeric: true,
      disablePadding: false,
      label: t('WoundsGrid.WoundNextDate')
    },
    {
      id: 'LastInterventionUser',
      numeric: false,
      disablePadding: false,
      label: t('WoundsGrid.WoundUser')
    }
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order.toLowerCase() : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id} //apenas apresenta a seta no campo que está aplicada a ordenação
              direction={order.toLowerCase()}
              className={(classes.label, classes.icon)}
              icon
              onClick={createSortHandler(headCell.id)}
            >
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
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    marginTop: theme.spacing(1)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
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
    width: 1
  },
  label: {
    fontSize: 12
  },
  fontSizeGrid: {
    fontSize: 12
  },
  icon: {
    fontSize: 13,
    fontWeight: 700
  },
}));

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: {
    maxWidth: 500, //'none'
    //backgroundColor: theme.palette.common.white,
    font: 'Nunito',
    color: '#494949',
    backgroundColor: 'white',
    minWidth: 150,
    border: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    fontSize: 12,
    margin: theme.spacing(1),
    marginLeft: 15
    /* boxShadow: theme.shadows[1], */
  },
  arrow: {
    color: theme.palette.primary.main,
    top: 25
  },
  tooltipArrow: {
    marginRight: -125
  }
}));

export default function EnhancedTable(props) {
  const { t } = useTranslation();
  const listPatients = useSelector((state) => state.wounds.list);
  const store = useSelector((store) => store);

  const classes = useStyles();
  const [order, setOrder] = React.useState(store.wounds.Order.toLowerCase()); //React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(store.wounds.PropertyOrder); //React.useState('nextIntervention');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(store.wounds.Page); //React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(store.wounds.NumberRowsPerPage); //React.useState(5);

  const classesTooltip = useStylesTooltip();

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);

    store.wounds.Refresh = true;
    store.wounds.Order = isDesc ? 'ASC' : 'DESC';
    store.wounds.PropertyOrder = property;
    props.changeOrder();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listPatients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    store.wounds.Refresh = true;
    store.wounds.Page = newPage;
    props.changeOrder();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    store.wounds.Refresh = true;
    store.wounds.NumberRowsPerPage = parseInt(event.target.value, 10);
    store.wounds.Page = 0;
    props.changeOrder();
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // A lista de utentes só tem os registos da página
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, listPatients.length - page * rowsPerPage);
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, listPatients.length);
  const emptyRows = listPatients.length === 0 ? 1 : 0; // decidido com GN a grelha ocupar só o espaço das linhas ocupadas.
  //const emptyRows = Math.min(rowsPerPage, listPatients.length - page * rowsPerPage) === 1 ? 1 : 0;

  const selectPatient = (patientId) => (event) => {
    if (patientId !== 0) {
      store.patient.PatientID = patientId;
      store.woundInfo.WoundID = 0;

      props.selectPatient();
    }
  };

  const selectPatientIntervention = (patientId, woundId) => (event) => {
    event.stopPropagation();
    if (patientId !== 0 && woundId !== 0) {
      store.patient.PatientID = patientId;
      store.woundInfo.WoundID = woundId;
      sessionStorage.removeItem(woundsTab);

      props.selectPatient();
    }
  };

  /*Next Interv Expired Date Logic*/
  let now = moment().format('MM-DD-YYYY');
  let styleNextInterv = {
    color: 'red'
  };

  return (
    <>
      <div className={classes.root} hidden={listPatients.length === 0}>
        <Paper className={classes.paper}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={store.wounds.NumberOfRecords} //{listPatients.length}
              />
              <TableBody>
                {stableSort(listPatients, getSorting(order, orderBy))
                  // A paginação é efetuada pelo serviço. A cada alteração de página é efetuado um novo pedido, logo não fazemos nada na grelha a não ser refrescar
                  //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        //onClick={event => handleClick(event, row.name)}
                        classes={classes.MuiTableRow}
                        onClick={selectPatient(row.id)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.lastInterventionWoundId}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
                        <Tooltip
                          disableFocusListener
                          title={row.name}
                          classes={classesTooltip}
                          arrow
                          placement='bottom-start'
                          enterDelay={300}
                        >
                          <TableCell
                            component='td'
                            id={labelId}
                            scope='row'
                            className='name-width'
                          >
                            <Box className='d-flex'>
                              <Image
                                className={
                                  'text-left mr-3 my-auto flex-shrink-0 fit-photo' +
                                  (row.photoURI === '' || row.photoURI === null
                                    ? ''
                                    : ' border-img-grd')
                                }
                                width='30'
                                height='30'
                                roundedCircle
                                src={
                                  row.photoURI === '' || row.photoURI === null
                                    ? PatientIcon
                                    : row.photoURI
                                }
                                onError={(event) => {
                                  event.target.src = PatientIcon;
                                  event.target.className =
                                    'text-left mr-3 my-auto flex-shrink-0';
                                }}
                              ></Image>
                              {/* <Tooltip disableFocusListener disableTouchListener title={row.name}> */}
                              <Typography
                                noWrap
                                className='my-auto font-weight-bold'
                                classes={{ root: classes.fontSizeGrid }}
                              >
                                {row.name}
                              </Typography>
                              {/* </Tooltip> */}
                            </Box>
                          </TableCell>
                        </Tooltip>
                        {/* <TableCell align="left" > {row.sns}</TableCell> */}
                        {/* Duas colunas*/}
                        <TableCell
                          scope='row'
                          align='left'
                          component='td'
                          className='type-width'
                        >
                          {row.type}
                        </TableCell>
                        <TableCell align='left' className='id-width'>
                          {row.identification}
                        </TableCell>
                        {/* Uma coluna */}
                        {/* <TableCell align="left" > {row.type} {row.identification}</TableCell> */}

                        {/* <TableCell align="right" className="room-width">{row.internment.length >= 1 && row.internment[row.internment.length - 1].exitDate == null && row.internment[row.internment.length - 1].room}</TableCell>
                      <TableCell align="right" className="bed-width">{row.internment.length >= 1 && row.internment[row.internment.length - 1].exitDate == null && row.internment[row.internment.length - 1].bed}</TableCell> */}
                        <TableCell align='right' className='room-width'>
                          {row.internment.length >= 1 &&
                            row.internment[0].exitDate == null &&
                            row.internment[0].room}
                        </TableCell>
                        <TableCell align='right' className='bed-width'>
                          {row.internment.length >= 1 &&
                            row.internment[0].exitDate == null &&
                            row.internment[0].bed}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='contained'
                            size='small'
                            className='button-table-wound w-100'
                            color='primary'
                            onClick={selectPatientIntervention(
                              row.id,
                              row.lastInterventionWoundId
                            )}
                          >
                            {row.lastInterventionType.type}
                          </Button>
                        </TableCell>
                        {/*<TableCell align="right">{row.lastIntervention}</TableCell>*/}
                        {/*<TableCell align="right">{row.nextIntervention}</TableCell>*/}
                        <TableCell align='right' className='last-intervention-width'>
                          {' '}
                          <Moment format='DD.MM.YYYY'>
                            {row.lastIntervention.toString()}
                          </Moment>
                        </TableCell>
                        <TableCell align='right' className='next-intervention-width'>
                          {moment(row.nextIntervention).isAfter(now) ? (
                            <Moment format='DD.MM.YYYY'>{row.nextIntervention}</Moment>
                          ) : (
                            <Moment format='DD.MM.YYYY' style={styleNextInterv}>
                              {row.nextIntervention}
                            </Moment>
                          )}
                        </TableCell>
                        <TableCell align='left' className='last-intervention-user-width'>
                          {row.lastInterventionUser}
                        </TableCell>
                        {/*
                      <TableCell>
                        <Link href="#" variant="body2" className="">
                          <u>{row.lastInterventionUser}</u>
                        </Link>
                      </TableCell>
                      */}
                      </TableRow>
                    );
                  })}
                {/* <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}> */}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={store.wounds.NumberOfRecords} //{listPatients.length}
              rowsPerPage={store.wounds.NumberRowsPerPage}
              page={store.wounds.Page}
              backIconButtonProps={{
                'aria-label': t('previousPage'),
                title: t('previousPage'),
                style: { outline: 'none' }
              }}
              nextIconButtonProps={{
                'aria-label': t('nextPage'),
                title: t('nextPage'),
                style: { outline: 'none' }
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage={t('RowsPerPage')}
            />
          </div>
        </Paper>
      </div>
    </>
  );
}
