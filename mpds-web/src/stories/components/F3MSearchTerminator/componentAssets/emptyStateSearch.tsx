import * as React from "react";
import { FunctionComponent } from "react";

// OUTSIDE COMPONENTS
import { makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* import i18n from "../../../../shared/i18n/i18n";
 */
interface EmptyStateSearchProps {
  showAddPatient?: boolean
}

const EmptyStateSearch: FunctionComponent<EmptyStateSearchProps> = ({
  showAddPatient = false
}) => {
  const useStyles = makeStyles(() => ({
    containerFilter: {
        padding: "40px 0 50px 0",
        textAlign: "center"
    },
    body1:{
        fontWeight: 700
    }
  }
  ));

  const classes = useStyles();

  return (
    <div className={`${classes.containerFilter}`}>
        <Typography variant="body1" gutterBottom display='block'  paragraph className={`${classes.body1}`}>
          No results were found for your search!
        </Typography>
        <Typography variant="body1" gutterBottom display='block'  paragraph hidden={!showAddPatient}>
          Try a new search, change your filters, or register a new user by clicking the button below.
        </Typography>
        <Button variant="contained" color="primary" disableElevation hidden={!showAddPatient}>
          {/* {i18n.t("buttons.addpatient")}  */}
          Adicionar Paciente
        </Button>
    </div>
  );
};

export default EmptyStateSearch
