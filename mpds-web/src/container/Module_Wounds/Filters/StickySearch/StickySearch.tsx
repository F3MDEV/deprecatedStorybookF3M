import React, { FunctionComponent, useState, useEffect } from 'react';
//INSIDE COMPONENTS

//OUTSIDE COMPONENTS
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ContentHeaderTitle from "../../../../components/content_header_title/contentHeader";
//CSS, STYLES & MEDIA ASSETS
import "./StickySearch.scss"

//UTILS

interface StickySearch{
    stickyContainerClass?: string
    title?: string,
    loadComponent?:any,
    aside?:any,
}

const StickySearch : FunctionComponent<StickySearch> = ({
    stickyContainerClass,
    title,
    loadComponent,
    aside,
    children
}) => {

    const [windowSize, setWindowSize] = useState(0);
    const [width, setWidth] = useState(0);
     
    const updateWindowDimensions= () => {
        setWidth(window.innerWidth)
    }

    const toogleHeader = (shrinkOn:number) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,

        headerEl = document.getElementById("SearchHeader");
      
        if(headerEl != null){
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-Search");
                headerEl.classList.remove("hidden-header-Search");
            } else {
                headerEl.classList.remove("visible-header-Search");
                headerEl.classList.add("hidden-header-Search");
            }
        }
    }

    const resizeHeaderOnScroll = () => {
        if (width >= 768 && width <= 992) {   //parseInt(lgBreakpoint)
            toogleHeader(141)
        } else if (width < 576){ 
            toogleHeader(129)
        } else {
            toogleHeader(132)
        }
    }

    const handleResize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener("scroll", resizeHeaderOnScroll);
        window.addEventListener("resize", handleResize);
        updateWindowDimensions()
        // Specify how to clean up after this effect:
       /*  return function cleanup() {
            window.removeEventListener("scroll", resizeHeaderOnScroll);
            window.removeEventListener("resize", handleResize);
        }; */
    });

    return (
        <div className={stickyContainerClass}>
            <div id="SearchHeader" className="sticky-Search shadow-nav-InfoPatient border-nav-InfoPatient hidden-header-Search">
                <ExpansionPanel className="background-search-bar border-radius-0" expanded={true}>
                    <ExpansionPanelDetails className="no-padding-y border-mobile">
                        <div className="d-flex justify-content-start height-search-bar w-100">
                        
                            <div className="my-auto title-search-container order-sm-first pl-md-0 pl-3 d-none d-md-block">
                                <ContentHeaderTitle fontFamily='Nunito' classes="d-inline text-uppercase title-search" title={title}/>
                            </div>
                            
                            <div className="my-auto w-100">
                                {loadComponent}
                            </div>
                            </div>
                            <div className="my-auto order-lg-last order-md-last">
                                {aside}
                            </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            {children}
     </div>
    )
}

export default StickySearch;
