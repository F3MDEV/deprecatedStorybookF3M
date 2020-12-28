import React, { FunctionComponent, useState, useEffect } from 'react';
//INSIDE COMPONENTS
import ButtonUI from '@material-ui/core/Button';
//OUTSIDE COMPONENTS
//CSS, STYLES & MEDIA ASSETS
import "./PatientCard.scss"
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";

//UTILS

export interface PatientCardProps {
    imageOfPatient?: any,
    hasImage?: boolean,
    nameOfPatient?: string,
    patientTypeDoc?: string,
    patientIdentification?: string,
    RoomCode?: string,
    BedCode?: string
    ButtonInfo?: string,
    nameHealthProfessional?: string,
    dateNextIntervention?: string,
    dateLastIntervention?: string,
    selectPatient? : any,
    selectIntervention? : any
}

const PatientCard: FunctionComponent<PatientCardProps> = ({
    imageOfPatient,
    hasImage,
    nameOfPatient,
    patientTypeDoc,
    patientIdentification,
    RoomCode,
    BedCode,
    ButtonInfo,
    nameHealthProfessional,
    dateNextIntervention,
    selectPatient,
    selectIntervention,
    dateLastIntervention,
    children
}) => {

    const { t } = useTranslation();

    return (
        <>
            <Paper className="card-patient cursor-pointer" onClick={selectPatient}>
                <div>
                    <div className="d-flex">
                        <Image className={hasImage ? "my-auto avatar-card-patient fit-photo border-img-grd" : "my-auto avatar-card-patient fit-photo"} roundedCircle
                            src={imageOfPatient}
                        ></Image>

                        <div className="text-left my-auto ml-3 flex-2">
                            <div className="d-flex ml-2">
                                <Box fontFamily="Roboto" fontSize={14} className="name-info-card pr-2 d-block m-0">
                                    {nameOfPatient}
                                </Box>
                            </div>
                            <div className="d-flex ml-2 patient-details">
                                <Typography variant="body2" className="font-weight-light m-0 font-size-12-px pr-3">
                                    <span className="font-weight-bold font-size-12-px pr-1">{patientTypeDoc}</span>
                                    <span className="identification-code font-size-12-px">{patientIdentification}</span>
                                </Typography>
                                <Typography variant="body2" className="font-weight-light m-0 font-size-12-px pr-3">
                                    <span className="font-weight-bold font-size-12-px pr-1">{t('WoundsPage.RoomAbbreviation')}</span>
                                    <span className="font-size-12-px">{RoomCode}</span>
                                </Typography>
                                <Typography variant="body2" className="font-weight-light m-0 font-size-12-px">
                                    <span className="font-weight-bold font-size-12-px pr-1">{t('WoundsPage.BedAbbreviation')}</span>
                                    <span className="font-size-12-px">{BedCode}</span>
                                </Typography>

                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={selectIntervention}
                        variant='contained'
                        size='small'
                        className='button-card-wound w-100 my-3 '
                       
                    /* onClick={selectPatientIntervention(
                      row.id,
                      row.lastInterventionWoundId
                    )} */
                    >
                        {ButtonInfo} <span className="roboto-thick">&nbsp;{dateLastIntervention}</span>
                    </Button>

                    <table className="w-100 text-center font-size-12-px bottom-info-container mt-2 ">
                    
                        <tr>
                            <th className="roboto-regular text-truncate"> {t('Professional')}</th>
                            <th className="roboto-regular text-truncate"> {t('NextIntervention')}</th>
                        </tr>
                        <tr>
                            <td className="font-weight-bold name-health-professional">{nameHealthProfessional}</td>
                            <td className="font-weight-bold text-truncate">{dateNextIntervention}</td>
                        </tr>
                    </table>
                       
                </div>
            </Paper>
        </>
    )
}


export default PatientCard;