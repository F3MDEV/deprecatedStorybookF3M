import React, { FunctionComponent } from 'react';
//INSIDE COMPONENTS

//OUTSIDE COMPONENTS
//CSS, STYLES & MEDIA ASSETS
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'react-bootstrap/Image';
import PatientIcon from '../../../utils/account-circle.svg';
import { makeStyles } from "@material-ui/core/styles";
//UTILS

export interface PatientCardProps {
    /**
        * Photo given to the IdCard.
        */
    idCardPhoto?: any
    /**
        * If the card doesn't got an image, it will load a default avatar on it.
        */
    hasImage?: boolean
    /**
        * Name of the person in the card.
        */
    idCardName?: string
    /**
        * Type of the document.
        */
    idCardTypeDoc?: string
    /**
        * Id of the card.
        */
    idCardIdentification?: string
    /**
        * Code of the room.
        */
    RoomCode?: string
    /**
        * Letter choseen for the room topic.
        */
    RoomCodeTopic?: string
    /**
        * Code of the bed.
        */
    BedCode?: string
    /**
        * Letter choseen for the bed topic.
        */
    BedCodeTopic?: string
    /**
        * Title of the first value.
        */
    valueOneTitle?: string
    /**
        * Title of the second value.
        */
    valueTwoTitle?: string
    /**
        * Title of the third value.
        */
    valueThreeTitle?: string
    /**
        * Title of the fourth value.
        */
    valueFourTitle?: string
    /**
        * Title of the fifth value.
        */
    valueFiveTitle?: string
    /**
        * Value number one.
        */
    valueOne?: string
    /**
        * Value number two.
        */
    valueTwo?: string
    /**
        * Value number three.
        */
    valueThree?: string
    /**
        * Value number four.
        */
    valueFour?: string
    /**
        * Value number five.
        */
    valueFive?: string
    /**
        * Name of the health professional.
        */
    nameHealthProfessional?: string
    /**
        * Date of the next intervention.
        */
    dateNextIntervention?: string
    /**
        * Date of the last intervention.
        */
    dateLastIntervention?: string
    /**
        * Select Patient.
        */
    selectPatient?: any
    /**
        * Select Intervention.
        */
    selectIntervention?: any
    /**
        * Color of the text.
        */
    colorOfTheText?: string
    /**
        * Color of the bottom link.
        */
    colorBottomLink?: string
    /**
        * Text given to the bottom link.
        */
    textOfBottomLink?: string
    /**
        * Callback when bottom link is clicked.
        */
    clickedLink?: any
    /**
        * Color of the main text.
        */
    colorText?: string
}

const PatientCard: FunctionComponent<PatientCardProps> = ({
    idCardPhoto,
    hasImage,
    idCardName,
    idCardTypeDoc,
    idCardIdentification,
    RoomCode,
    RoomCodeTopic,
    BedCode,
    BedCodeTopic,
    selectPatient,
    valueOneTitle,
    valueTwoTitle,
    valueThreeTitle,
    valueFourTitle,
    valueFiveTitle,
    valueOne,
    valueTwo,
    valueThree,
    valueFour,
    valueFive,
    colorBottomLink,
    textOfBottomLink,
    clickedLink,
    colorText
}) => {
    const useStyles = makeStyles(theme => ({
        displayFlex: {
            display: "flex"
        },
        displayBlock: {
            display: "block"
        },
        robotoBold: {
            fontFamily: "Roboto",
            fontWeight: 700
        },
        robotoRegular: {
            fontFamily: "Roboto",
            fontWeight: 400
        },
        robotoThin: {
            fontFamily: "Roboto",
            fontWeight: 200
        },
        mL3: {
            marginLeft: 10,
        },
        mL2: {
            marginLeft: 5,
        },
        m0: {
            margin: 0,
        },
        ml4: {
            marginLeft: 15,
        },
        p0: {
            padding: 0,
        },
        pr1: {
            paddingRight: 2.5,
        },
        pr2: {
            paddingRight: 5,
        },
        pr3: {
            paddingRight: 10,
        },
        pt4: {
            paddingTop: 15,
        },
        pl5: {
            paddingLeft: 30,
        },
        textLeft: {
            textAlign: "left"
        },
        textUppercase: {
            textTransform: "uppercase",
        },
        myAuto: {
            marginTop: "auto",
            marginBottom: "auto"
        },
        positionAbsolute: {
            position: "absolute",
        },
        fontWeightLight: {
            fontWeight: 300,
        },
        fontWeightBold: {
            fontWeight: 800,
        },
        fontSizeTwelve: {
            fontSize: 12,
        },
        idCard: {
            width: 350,
            height: 238,
            padding: 20,
            overflow: "hidden",
            boxShadow: "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
            color: colorText as string
        },
        flexTwo: {
            flex: 2,
        },
        avatarIdCard: {
            width: 50,
            height: 50,
            minWidth: 49,
            minHeight: 49,
        },
        fitPhoto: {
            objectFit: "cover",
        },
        roundedCircle: {
            borderRadius: "50%"
        },
        borderImageGrd: {
            border: "2px solid #DCDCDC"
        },
        listWoundsCard: {
            fontSize: 14,
            listStyle: "none",
        },
        idCode: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: 100,
        },
        nameInfoCard: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
            fontWeight: 700,
            display: "-webkit-box",
            lineClamp: 2,
            boxOrient: "vertical",
            fontFamily: "Roboto"
        },
        patientDetails: {
            "& .MuiTypography-root": {
                "&:nth-child(2), &:nth-child(3)": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    lineClamp: 2,
                    boxOrient: "vertical"
                },
                "&:first-of-type": {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }
        }
    }))

    const styleClass = useStyles();

    return (
        <>
            <Paper className={`${styleClass.idCard}`} onClick={selectPatient}>
                <div>
                    <div className={`${styleClass.displayFlex} `}>
                        <Image className={hasImage ? `${styleClass.myAuto} ${styleClass.avatarIdCard} ${styleClass.fitPhoto} ${styleClass.borderImageGrd}` : `${styleClass.myAuto} ${styleClass.avatarIdCard} ${styleClass.fitPhoto}`} roundedCircle
                            src={hasImage ? idCardPhoto : PatientIcon}
                        ></Image>
                        <div className={`${styleClass.textLeft} ${styleClass.myAuto} ${styleClass.flexTwo} ${styleClass.mL3}`}>
                            <div className={`${styleClass.displayFlex} ${styleClass.mL2}`}>
                                <Box fontSize={14} className={`${styleClass.nameInfoCard} ${styleClass.displayBlock} ${styleClass.pr2} ${styleClass.m0}`}>
                                    {idCardName}
                                </Box>
                            </div>
                            <div className={`${styleClass.mL2} ${styleClass.patientDetails} ${styleClass.displayFlex}`}>
                                <Typography variant="body2" className={`${styleClass.fontWeightLight} ${styleClass.fontSizeTwelve} ${styleClass.m0} ${styleClass.pr3}`}>
                                    <span className={`${styleClass.robotoBold} ${styleClass.fontSizeTwelve} ${styleClass.pr1}`}>{idCardTypeDoc}</span>
                                    <span className={`${styleClass.fontSizeTwelve} ${styleClass.idCode} ${styleClass.pr1}`}>{idCardIdentification}</span>
                                </Typography>
                                <Typography variant="body2" className={`${styleClass.fontWeightLight} ${styleClass.fontSizeTwelve} ${styleClass.m0} ${styleClass.pr3}`}>
                                    <span className={`${styleClass.robotoBold} ${styleClass.fontSizeTwelve} ${styleClass.pr1}`}>{RoomCodeTopic}</span>
                                    <span className={`${styleClass.fontSizeTwelve}`}>{RoomCode}</span>
                                </Typography>
                                <Typography variant="body2" className={`${styleClass.fontWeightLight} ${styleClass.fontSizeTwelve} ${styleClass.m0}`}>
                                    <span className={`${styleClass.robotoBold} ${styleClass.fontSizeTwelve} ${styleClass.pr1}`}>{BedCodeTopic}</span>
                                    <span className={`${styleClass.fontSizeTwelve}`}>{BedCode}</span>
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className={`${styleClass.displayFlex}`}>
                        <div className={`${styleClass.mL3} ${styleClass.flexTwo} ${styleClass.myAuto} ${styleClass.textLeft}`}>
                            <div className={`${styleClass.displayFlex} ${styleClass.mL2} ${styleClass.patientDetails}`}>
                                <Typography variant="body2" className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightLight} ${styleClass.m0}`}> <span className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightLight}`}>{/* {this.props.patient.PatientInfo.type} */} </span><span className={`${styleClass.fontSizeTwelve} ${styleClass.idCode}`}> {/* {this.props.patient.PatientInfo.identification} */}</span> {/* {listInternments.length > 0 ? <span className="px-1 font-size-12-px">|</span> : ""} */}</Typography>
                                <Typography variant="body2" className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightLight} ${styleClass.m0}`}> <span className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightBold}`}> {/* {t('WoundsPage.RoomAbbreviation')} */}</span> {/* {listInternments.length > 0 ? <span className="font-size-12-px"> {listInternments[0].room} <span className="px-1 font-size-12-px">|</span></span> : ""} */}</Typography>
                                <Typography variant="body2" className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightLight} ${styleClass.m0}`}> <span className={`${styleClass.fontSizeTwelve} ${styleClass.fontWeightBold}`}> {/* {t('WoundsPage.BedAbbreviation')} */}</span> {/* {listInternments.length > 0 ? <span className="font-size-12-px">{listInternments[0].bed}</span> : ""} */}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={`${styleClass.displayFlex} ${styleClass.pt4}`}>
                        <ul className={`${styleClass.listWoundsCard} ${styleClass.p0}`}>
                            <li className={`${styleClass.robotoRegular}`}>{valueOneTitle}</li>
                            <li className={`${styleClass.robotoRegular}`}>{valueTwoTitle}</li>
                            <li className={`${styleClass.robotoRegular}`}>{valueThreeTitle}</li>
                            <li className={`${styleClass.robotoRegular}`}>{valueFourTitle}</li>
                            <li className={`${styleClass.robotoRegular}`}>{valueFiveTitle}</li>
                        </ul>
                        <ul className={`${styleClass.listWoundsCard} ${styleClass.pl5} ${styleClass.ml4} ${styleClass.robotoBold}`}>
                            <li>
                                <span className={`${styleClass.fontWeightBold}`}>{valueOne}</span>
                            </li>
                            <li>
                                <span className={`${styleClass.fontWeightBold}`}>{valueTwo}</span>
                            </li>
                            <li>
                                <span className={`${styleClass.fontWeightBold}`}>{valueThree}</span>
                            </li>
                            <li>
                                <span className={`${styleClass.fontWeightBold}`}>{valueFour}</span>
                            </li>
                            <li>
                                <span className={`${styleClass.fontWeightBold}`}>{valueFive}</span>
                            </li>
                        </ul>
                    </div>
                    <ButtonBase
                        disableRipple
                        disableTouchRipple
                        focusRipple
                        onClick={clickedLink as any}
                    >
                        <Box
                            color={colorBottomLink}
                            fontSize={14}
                            className={`${styleClass.robotoBold} ${styleClass.textUppercase}`}>
                            {textOfBottomLink}
                        </Box>
                    </ButtonBase>
                </div>
            </Paper>
        </>
    )
}

export default PatientCard;