import React from 'react';

//OUTSIDE COMPONENTS
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Navbar } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import { withTranslation } from "react-i18next";
//CSS, STYLES & MEDIA ASSETS
import logo_header from '../utils/logo_MPDS_mini.svg';
import illustrationMaintenance from "../utils/mpds_maintenance-illustration.svg";
import "./MaintenanceBondary.scss"
import variables from "../assets/bootstrap/scss/_variables.scss";


//Scss variable
const mainText = variables.mainText;
const {secondaryFont, primaryFont} = variables; 

class MaintenanceBondary extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { t } = this.props;
  
        // Error path
        return (
          <div className="maintenance-background">
            <Container className="maintenance-container">
              <header className="main-header container">
                <div className="negative-margins">
                  <Navbar expand="lg" className="pb-5 pt-4 mb-lg-0 mb-md-4">
                    <Navbar.Brand>
                      <Image
                        fluid
                        src={logo_header}
                        width="120"
                        alt="logo" />
                    </Navbar.Brand>
                  </Navbar>
                </div>
              </header>
  
              <Row className="justify-content-md-center mt-md-5 pt-md-5 mt-0 pt-0 ">
                <Col xs={12} lg={4} className="my-auto">
                    <Box className="title-error px-0 pb-1 px-lg-0 mx-lg-0 px-md-5 mx-0 mx-md-5" fontFamily={secondaryFont} fontWeight={900}>
                      {t('Maintenance.HangOn')}
                    </Box>
                    <Box className="description-error my-4 my-md-2 my-lg-4 px-lg-0 mx-lg-0 px-md-5 mx-md-5" fontFamily={secondaryFont} fontWeight={500}>
                      {t('Maintenance.SoonWillBe')}
                    </Box>
                    {/* <div className="notify-input pt-2 pt-md-4 pt-lg-0 px-5 px-lg-0">
                      <TextField
                        className="w-100"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment:  <IconButton className="grey-icon-override outline-none" size="small" aria-label="f3m" onClick={this.onClickSettings}>
                                <SendIcon color="primary" fontSize="small" />
                            </IconButton>
                        }}
                        label={t('Maintenance.NotifyMe')}
                        placeholder={t('Login.Email')}
                      />
                    </div> */}
                    <img width="200px" src="images\f3mfeelit-fundobranco.png" className="f3m-logo d-lg-block d-none" alt=""></img>
                </Col >
                <Col xs={12} lg={6} className="illustration-column">
                  <Image src={illustrationMaintenance} className="ilustration-error mx-lg-0 mx-auto mt-lg-0 mt-md-5 pt-md-0 pt-sm-5" fluid alt="logo" />
                  <img width="200px" src="images\f3mfeelit-fundobranco.png" className="mx-auto d-lg-none d-md-block f3m-logo" alt=""></img>
                </Col>
              </Row>
            </Container>
          </div>
        );
     }
  }
  
export default withTranslation()(MaintenanceBondary);