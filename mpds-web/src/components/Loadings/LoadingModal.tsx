import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Loadings.scss"

const LoadingModal = ({
  hidden = false,
  isFixed = false
}: {
  hidden?: boolean;
  isFixed?: boolean
}) => {
  return (
    <div className={isFixed ? "loading-center fixed text-center" : "loading-center text-center"}>
      <CircularProgress hidden={hidden} color="primary" />
    </div>
  );
};

export default LoadingModal;
