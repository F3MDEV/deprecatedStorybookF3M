import React, { useEffect, useState, FunctionComponent } from 'react';
//import PropTypes from 'prop-types';
//import './_style.scss';

import { makeStyles } from '@material-ui/core/styles';

//import i18n from '../../../../shared/i18n/i18n';
//import { isDefined } from '../../../../shared/helpers/utils';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

interface PatientResultsProps {
    hightlightedChars: any, 
    suggestion : any 
}

const PatientResult : FunctionComponent<PatientResultsProps>  = ({ hightlightedChars, suggestion }) => {
  const classes = useStyles();
  const [utente, setUtente] = useState({
      idade: 0,
      idadeMeses: 0,
      foto: '',
      /* typeDoc: 'SNS',
      codeDoc: '5555', */
      sns: '',
      ativo: false,
  });
  const [idade, setIdade] = useState('');

  useEffect(() => {
    /* if (isDefined(suggestion)) */ setUtente(suggestion);
  }, [suggestion]);

  useEffect(() => {
    /* if (isDefined(utente) && isDefined(utente.idade)) { */
      setIdade(
        utente.idadeMeses <= 36
          ? 'Meses' //`${utente.idadeMeses} ${i18n.t('common.meses')}`
          : 'Area' //`${utente.idade} ${i18n.t('common.anos')}`
      );

    /* } */
  }, [utente]);

  const handleErrorImg = () => {
    const newUtente = { ...utente };
    //const errorImg = `${require('../../../../assets/img/image_placeholder.svg')}`;
    //newUtente.foto = errorImg;
    setUtente(newUtente);
  };

  return (
    <>
      {/* {isDefined(utente) && ( */}
        <table className="w-100">
          <tbody>
            <tr>
              <td className="text-left" style={{ width: '70%' }}>
                <div className="position-relative float-left">
                  {!utente.ativo && (
                    <span
                      className="badge badge-pill badge-danger badge-over-card__bottom"
                      style={{ fontSize: '7px' }}
                    >
                      {/* {i18n.t('cabecalho.inactivo')} */}
                      "Inactivo"
                    </span>
                  )}
                  <img
                    className={`${classes.small} border rounded-corners mx-3 my-auto flex-shrink-0 `}
                    src={utente.foto}
                    alt=""
                    onError={handleErrorImg}
                  />
                </div>
                <div className="mt-2">
                  {hightlightedChars.map((part : any, i : any) => {
                    const className = part.highlight ? 'react-autosuggest__suggestion-match' : undefined;
                    return (
                      <span className={className} key={i}>
                        {part.text}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td className="text-left" style={{ width: '15%' }}>
                {utente.sns} 
              </td>
              <td className="text-left" style={{ width: '15%' }}>
                {idade}
              </td>
            </tr>
          </tbody>
        </table>
      {/* )} */}
    </>
  );
};

export default PatientResult;
