import React, { FunctionComponent, useState, useEffect } from 'react';
//INSIDE COMPONENTS

//OUTSIDE COMPONENTS
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'

//CSS, STYLES & MEDIA ASSETS
import variables from "../../assets/bootstrap/scss/_variables.scss"
import "./header_info_patient.scss"

//UTILS
import { calculateAge } from "../../utils/utils"

interface Internment {
    bed: string,
    room: string,
}

interface HeaderInfoProps extends Internment {
    patientName: string,
    props: any,
    patientType: string,
    patientIdentification: string,
    patientBirthDate: number,
    patientGender: string,
    traduction: any,
    stickyContainerClass?: string,
    yAxisLgToogleHeader?: number,
    yAxisMdToogleHeader?: number,
    yAxisXsToogleHeader?: number
}

const HeaderInfoPatient: FunctionComponent<HeaderInfoProps> = ({
    patientName,
    patientType,
    patientIdentification,
    patientBirthDate,
    patientGender,
    props,
    bed,
    room,
    traduction,
    stickyContainerClass,
    yAxisLgToogleHeader,
    yAxisMdToogleHeader,
    yAxisXsToogleHeader,
    children
}) => {

    const [windowSize, setWindowSize] = useState(0);
    const [width, setWidth] = useState(0);
    const [expansionPanelOpen, setexpansionPanelOpen] = useState(false);

    const updateWindowDimensions = () => {
        setWidth(window.innerWidth)
    }

    const toogleHeader = (shrinkOn: number) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            // validar este tamanho!!! 
            headerEl = document.getElementById("PatientHeader");

        if (headerEl != null) {
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-Patient");
                headerEl.classList.remove("hidden-header-Patient");
            } else if (distanceY < shrinkOn){
                headerEl.classList.remove("visible-header-Patient");
                headerEl.classList.add("hidden-header-Patient");
            }
        }
    }

    const resizeHeaderOnScroll = () => {
        if (width >= 768 && width <= 992) {   //parseInt(lgBreakpoint)
            toogleHeader(/* 360 */ yAxisMdToogleHeader as number)
        } else if (width < 576) {
            toogleHeader(/* 609 */ yAxisXsToogleHeader as number)
        } else {
            toogleHeader(/* 357 */ yAxisLgToogleHeader as number)
        }
    }

    const onChangeExpanded = (event : any) => {
        setexpansionPanelOpen(!expansionPanelOpen);
    }

    const handleResize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener("scroll", resizeHeaderOnScroll);
        window.addEventListener("resize", handleResize);
        updateWindowDimensions()
        // Specify how to clean up after this effect:
        // return function cleanup() {
        //     window.removeEventListener("scroll", resizeHeaderOnScroll);
        //     window.removeEventListener("resize", handleResize);
        // };
    });

    return (
        <div className={stickyContainerClass}>
            <div id="PatientHeader" className="hidden-header-Patient sticky-InfoPatient shadow-nav-InfoPatient ">
                <ExpansionPanel className="pl-lg-4 shadow-nav" expanded={width >= 768 ? true : expansionPanelOpen} onChange={(v) => onChangeExpanded(v)}>
                    <ExpansionPanelSummary
                        className="d-md-none"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="h6" className="font-size-16-px name-info-card d-block m-0 name-line-height my-auto">
                            {patientName}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="w-100 no-padding-y panel-details-patient border-mobile px-4 px-md-5">
                        <div className="mobile-flex-none d-flex justify-content-center mx-auto flex-column flex-md-row">
                            <div className="pr-lg-5 pr-0 py-1 d-none d-md-flex d-lg-flex d-xl-flex">
                                <Typography variant="h6" className="font-size-14-px roboto-bold name-info-card pr-5 d-block m-0 name-line-height mt-2">
                                    {patientName}
                                </Typography>
                            </div>

                            <div className="pr-lg-5 pt-3 pb-1 py-sm-3 pr-2 center-item">
                                <Typography variant="caption" className="roboto-thin pr-5 my-auto" {...props}>
                                    <span className="font-weight-bold pr-1">
                                        {patientType}
                                    </span>
                                    <span className="identification-code">
                                        {patientIdentification}
                                    </span>
                                    <span className="px-1" hidden={room.length === 0}>|</span>
                                    <span className="font-weight-bold" hidden={room.length === 0}> {traduction('WoundsPage.RoomAbbreviation')}</span>
                                    {room.length > 0 ? <span hidden={room.length === 0}>
                                        {room}
                                    </span> : ""}
                                    <span className="px-1" hidden={bed.length === 0}>|</span>
                                    <span className="font-weight-bold" hidden={bed.length === 0}> {traduction('WoundsPage.BedAbbreviation')} </span>
                                    {bed.length > 0 ? <span hidden={bed.length === 0}>
                                        {bed}
                                    </span> : ""}
                                </Typography>
                            </div>

                            <div className="pr-lg-5 py-1 py-sm-3 center-item flex-shrink-5">
                                <Typography variant="caption" className="roboto-thin pr-5 my-auto" {...props}>
                                    <span className="font-weight-bold pr-2">{traduction('Patient.Age')}</span>
                                    {!patientBirthDate ? "--" : calculateAge(patientBirthDate)} (
                            <Moment format="DD.MM.YYYY">{patientBirthDate.toString()}</Moment>)</Typography>
                            </div>

                            <div className="pt-1 pb-3 py-sm-3 center-item flex-shrink-5">
                                <Typography fontFamily="Roboto" variant="caption" className="font-weight-light pr-5 my-auto" {...props}>
                                    <span className="font-weight-bold pr-2">{traduction('Patient.Gender')}</span>
                                    {patientGender}
                                </Typography>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            {children}
        </div>
    )
}

export default HeaderInfoPatient;
