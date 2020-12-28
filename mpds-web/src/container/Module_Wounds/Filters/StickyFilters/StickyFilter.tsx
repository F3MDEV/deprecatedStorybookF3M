import React, { FunctionComponent, useState, useEffect } from 'react';
//INSIDE COMPONENTS

//OUTSIDE COMPONENTS
//CSS, STYLES & MEDIA ASSETS
import "./StickyFilter.scss"

//UTILS

interface StickyFilter{
    loadComponent?:any,
}

const StickyFilter : FunctionComponent<StickyFilter> = ({
    loadComponent,
    children
}) => {

    const [windowSize, setWindowSize] = useState(0);
    const [width, setWidth] = useState(0);
     
    const updateWindowDimensions= () => {
        setWidth(window.innerWidth)
    }

    const toogleHeader = (shrinkOn:number) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        // validar este tamanho!!! 
        headerEl = document.getElementById("FilterHeader");
      
        if(headerEl != null){
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-Filter");
                headerEl.classList.remove("hidden-header-Filter");
            } else {
                headerEl.classList.remove("visible-header-Filter");
                headerEl.classList.add("hidden-header-Filter");
            }
        }
    }

    const resizeHeaderOnScroll = () => {
        if (width >= 768 && width <= 992) {   //parseInt(lgBreakpoint)
            toogleHeader(194)
        } else if (width < 576){ 
            toogleHeader(200)
        } else {
            toogleHeader(192)
        }
    }

    const handleResize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener("scroll", resizeHeaderOnScroll);
        window.addEventListener("resize", handleResize);
        updateWindowDimensions()
        // Specify how to clean up after this effect:
/*         return function cleanup() {
            window.removeEventListener("scroll", resizeHeaderOnScroll);
            window.removeEventListener("resize", handleResize);
        }; */
    });

    return (
        <>
            <div id="FilterHeader" className="sticky-Filter shadow-nav-InfoPatient border-nav-InfoPatient hidden-header-Filter">
                {children}
            </div>
        </>
    )
}

export default StickyFilter;
