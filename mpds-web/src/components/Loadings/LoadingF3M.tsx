import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import "./Loadings.scss"


const LoadingF3M = ({
  hidden = false,
}: {
  hidden?: boolean;
}) => {


  const { t } = useTranslation();
  
  return (
    <div className="loading-center text-center">
      <CircularProgress hidden={hidden} color="primary" />
      <Typography hidden={hidden} variant="caption" display="block" gutterBottom color="textPrimary">
        {t('Loading.Loading')}
      </Typography>
    </div>
  );
};

export default LoadingF3M;
