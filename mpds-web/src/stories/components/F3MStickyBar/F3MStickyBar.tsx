import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { FunctionComponent, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';

//ICONS
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface StickyTopBarProps {
    /**
     * CSS position of the bar.
    */
    barPosition?: 'absolute' | 'sticky'
    /**
     * Classes of the header container.
    */
    headerContainerClasses?: string
    /**
     * Insert elements in the Summary.
    */
    summaryContent?: React.ReactNode
    /**
     * Insert the elements of the Healthi Patient's Summary. (isHealthiPatientSummaryActive value has to be "false").
    */
    isHealthiPatientSummaryActive?: boolean
    /**
     * Insert badge in the PatientPhoto (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiBadgePatientPhoto?: React.ReactNode
     /**
     * Insert patient photo (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiPatientPhoto?: string
    /**
     * Handle error of the patient photo (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiHandleErrorImg?: () => void;
    /**
     * Insert patient name (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiPatientName?: string
    /**
     * Insert patient age (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiPatientAge?: string
    /**
     * Insert patient SNS (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiPatientSNS?: string
    /**
     * Insert patient entity (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiPatientEntity?: string
    /**
     * Insert report icon (isHealthiPatientSummaryActive value has to be "true").
    */
    healthiReportIcon?: React.ReactNode
    /**
     * Insert elements in the first section of details.
    */
    detailsContentOne?: React.ReactNode
      /**
     * Insert elements in the second section of details.
    */
    detailsContentSecond?: React.ReactNode
     /**
     * Insert elements in the third section of details.
    */
    detailsContentThird?: React.ReactNode
     /**
     * Insert dashed board between first and second detail section.
    */
    isDashedBoardSecondContentInserted?: boolean
    /**
     * Insert dashed board between second and third detail section.
    */
    isDashedBoardThirdContentInserted?: boolean
  }  

const StickyTopBar: FunctionComponent<StickyTopBarProps>  = ({
    barPosition = 'absolute',
    headerContainerClasses = "w-100",
    summaryContent = <div>
      Who Cares.
    </div>,
    isHealthiPatientSummaryActive = true,
    healthiBadgePatientPhoto = <span className={`badge rounded-pill bg-danger`} style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 1, bottom: -10, fontSize: '7px', textTransform: 'capitalize', width: '42px', maxHeight: '13px'}}>
        Inativo
    </span>,
    healthiPatientPhoto = 'https://www.looper.com/img/gallery/why-did-the-old-man-play-in-squid-game/l-intro-1633465995.jpg',
    healthiHandleErrorImg,
    healthiPatientName = 'José Pereira Andrade',
    healthiPatientAge= '92 anos',
    healthiPatientSNS = '001',
    healthiPatientEntity = ' Por definir',
    healthiReportIcon = <ReportProblemIcon
    id={'popoverbutton'}
    aria-owns={'mouse-over-popover'}
    aria-haspopup="true"
    className={`ms-4`}
    style={{color: "#FF9800"}}></ReportProblemIcon>,
    detailsContentOne = <div style={{display: 'grid', gridGap: 5, fontSize: 14, whiteSpace: 'nowrap', gridTemplateColumns: 'min-content auto min-content auto'}}>
    <div className={`fw-bold`}>Nacionalidade</div>
    <div className={`ps-2`}>Portuguesa</div>
    <div className={`fw-bold`}>Nº de Beneficiário</div>
    <div className={`ps-2`}>001 | 20/08/2025</div>
    <div className={`fw-bold`}>Contatos</div>
    <div className={`ps-2`}>918804958 | squidOldMan@nflx.pt</div>
    <div className={`fw-bold`}>CESD</div>
    <div className={`ps-2`}>00000000012345678914</div>
</div>,
detailsContentSecond = <>
    <Typography variant="h6" style={{fontSize: '1rem'}} className={`fw-bold`}>
        Benefícios
    </Typography>
    <div className={`row`} style={{fontSize: 14}}>
        <div className={`col-6 d-flex`}>
        <Typography variant="h5" className={`fw-bold pe-4`}>R</Typography>
            <div className="d-flex flex-column">
                <label className="pt-1">
                    Beneficiários do Complemento Solidário para Idosos (BAS)
                </label> 
            </div>
        </div>
        <div className={`col-6 d-flex`}>
            <Typography variant="h5" className={`fw-bold pe-4`}>O</Typography>
            <div className="d-flex flex-column">
                <label className="pt-1" >
                    Doentes crónicos com guia
                </label>
            </div>
        </div>
    </div>
    <Typography variant="h6"  style={{fontSize: '1rem'}} className={`fw-bold mt-2`}>
        Regimes de Exceção
    </Typography>
    <div className={`pt-2`} style={{display: 'grid', gridGap: 5, fontSize: 14, whiteSpace: 'nowrap', gridTemplateColumns: 'min-content auto'}}>
        <div className={`fw-bold`}>Vítimas de Incêndio</div>
        <div className={``}>|  <span className={`fst-italic`}>Início</span>: 01/12/2016</div>
    </div>
</>,
detailsContentThird = <>
    <Typography variant="h6" style={{fontSize: '1rem'}} className={`fw-bold d-inline`}>
        Alergias
    </Typography>
    <IconButton size='small' disableFocusRipple disableRipple style={{right: 10, zIndex: 1, position: 'absolute', marginTop: -10}} color="primary" aria-label="save">
    <EditIcon />
    </IconButton>
    <div style={{fontSize: 14}}>
        <span style={{fontStyle: 'italic'}}>Sem alergias.</span>
    </div>
    </>,
    isDashedBoardSecondContentInserted = true,
    isDashedBoardThirdContentInserted = true
}) => {

  //popover
  const [healthiPatientSummary] = useState(isHealthiPatientSummaryActive)
  const [isDashedBoardSecondContentActive] = useState(isDashedBoardSecondContentInserted)
  const [isDashedBoardThirdContentActive] = useState(isDashedBoardThirdContentInserted)
  const [openAccordion, setOpenAccordion] = useState(false)

  const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
    root:{
      '&.MuiFormGroup-root':{
        maxHeight: 132,
        display: "grid",
        overflow: "auto"
      },
      '&.MuiTextField-root':{
        backgroundColor: "#ffffff",
        '& .MuiInputBase-input':{
          backgroundColor: "#ffffff",
        }
      },
      '&.MuiAccordionSummary-root':{
        backgroundColor: '#f8f8f8',
        '&:hover':{
          backgroundColor: '#f8f8f8',
          '& .customColorInput':{
            '& .MuiInputBase-root':{
              backgroundColor: '#f8f8f8'
            }
          }
        },
        '&.Mui-expanded':{
          backgroundColor: '#f8f8f8',
          '& .customColorInput':{
            '& .MuiInputBase-root':{
              backgroundColor: '#f8f8f8'
            }
          }
        }
      },
      '&.MuiAccordionDetails-root':{
        display: 'block',
        backgroundColor: '#f8f8f8',
        '& .MuiFormControl-root':{
          '& .MuiFilledInput-root':{
            '& .MuiSelect-filled.MuiSelect-filled':{
              backgroundColor: "#ffffff",
            }
          }
        }
        
      },
      '&.MuiSelect-root':{
        backgroundColor: "#ffffff",
      }
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2)',
    },
    smallBadge:{
      width: theme.spacing(4),
    },
    large: {
      width: 40,
      height: 40,
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2)',
      objectFit: 'cover'
    },

    rightZero:{
      position: 'absolute',
      right: 0,
    },
    marginIconBigHeaderDetails:{
      //marginLeft: 8,
      marginRight: 8,
    },
    paddingIconBigHeaderDetails:{
      padding: 8,
    },
    fontSize10:{
      fontSize: 11,
    },
    flex:{
      display: 'flex'
    },
    label:{
      marginBottom: 0,
      marginLeft: 0,
      maxHeight: '35px'
    },
    rootSelectForm:{
      "& .MuiFilledInput-inputMarginDense":{
        paddingBottom: 6.6
      },
      "& .MuiInputLabel-filled.MuiInputLabel-marginDense": {
        transform: "translate(12px, 18px) scale(1)"
      },
      "& .MuiInputLabel-filled.MuiInputLabel-shrink.MuiInputLabel-marginDense": {
        transform: "translate(12px, 8px) scale(0.75)"
      },
      "& .MuiSelect-root":{
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
      }
    },
    rootTextField:{
      "& .MuiFilledInput-root":{
        height: 48
      }
    },
    rootDatePickerForm:{
      "& .MuiFilledInput-root":{
        height: 48
      } 
    },
    firstButton:{
      top: 70,
    },
    thirdButton:{
      top: 335,
    },
    dashedBorder:{
      borderTop: "dashed #999999 1px", 
      strokeWidth: 1
    },
    allergiesContainer:{
      display: 'grid',
      gridGap: 5,
      fontSize: 14,
      whiteSpace: 'nowrap',
      gridTemplateColumns: 'min-content min-content',
    },

    popover: {
      pointerEvents: 'none',
    },
    paper:{
      "&.MuiPopover-paper":{
        paddingTop: 8,
        fontSize: 12
      }
    },
    allergiesList:{
      fontSize: 12,
      paddingTop: 8,
      marginLeft: 10,
      paddingLeft: 10,
      marginRight: 10,
      paddingRight: 10,
    },
    allergiesTitle:{
      paddingLeft: 5,
      paddingTop: 15,
      marginTop: 15,
      marginLeft:5
    },
    sticky:{
      top: 0,
      zIndex: 2,
      position: barPosition,
    },
    bigHeader:{
        marginLeft: '0 !important',
        marginRight: '0 !important',
        alignItems: 'center',
        borderBottom: '1px dashed #d2d2d2'
    },
    photoNameGroup:{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 15
    },
    photoGroup:{
        position: 'relative',
        marginRight: 12,
        filter: 'drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.22))'
    }
}));

  const classes = useStyles();

  const handleChangeAccordion = () => {
    if (openAccordion) {
      setOpenAccordion(false)
    } else {
      setOpenAccordion(true)
    }
  }

  return (
    <>   
        <div className={`row ${classes.bigHeader} ${classes.sticky} ${headerContainerClasses}`}>
            <Accordion className="w-100" expanded={openAccordion} onChange={handleChangeAccordion}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            className={classes.root}
            id="panel1a-header">
            {healthiPatientSummary ? 
                <div className={`col-sm-12 col-md-12 col-lg-9 col-xl-9 ps-0 ${classes.photoNameGroup}`}>
                    <div className={classes.photoGroup}>
                    {healthiBadgePatientPhoto}
                    <img
                        className={`${classes.large} border rounded`}
                        src={healthiPatientPhoto}
                        onError={healthiHandleErrorImg}
                    />
                    </div>
                    <div className="w-100 d-flex">
                    <Box className="my-auto" fontSize={12}>{healthiPatientName} &nbsp; {healthiPatientAge} &nbsp;&nbsp;|&nbsp;&nbsp;<b> SNS:</b> {healthiPatientSNS} &nbsp;&nbsp;|&nbsp;&nbsp;<b>Entidade:</b>{healthiPatientEntity}</Box> 
                        {healthiReportIcon}
                    </div>
                </div>
                :
                {summaryContent}
            }
        </AccordionSummary>
        <AccordionDetails className={`${classes.root} pt-0`}>
            {detailsContentOne}
            
            {isDashedBoardSecondContentActive ? <hr className={classes.dashedBorder} /> : ""}
            {detailsContentSecond}
                
            {isDashedBoardThirdContentActive ? <hr className={classes.dashedBorder} /> : ""}
            {detailsContentThird}
        </AccordionDetails>
            </Accordion>
        </div>
    </> 
);};

export default StickyTopBar;