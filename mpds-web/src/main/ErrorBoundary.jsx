import React from 'react';

//OUTSIDE COMPONENTS
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Navbar } from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import { withTranslation } from "react-i18next";

//CSS, STYLES & MEDIA ASSETS
import logo_header from '../utils/logo_MPDS_mini.svg';
import illustration404 from "../utils/mpds_404-illustration.svg";
import "./ErrorBoundary.scss"
import variables from "../assets/bootstrap/scss/_variables.scss";
import illustration505 from "../utils/mpds_505-illustration.svg";
import illustrationError from "../utils/mpds_errr-illustration.svg";

//Scss variable
const mainText = variables.mainText;
const {secondaryFont, primaryFont} = variables;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
          error: error,
          errorInfo: errorInfo,
      })

      // You can also log error messages to an error reporting service here
/*       console.log(error);
      console.log(error.toString().includes("404"));
      console.log(errorInfo); */
  }

  onClickRefresh(){
    window.location.reload();
    return false;
  }

  render() {

    const { t } = this.props;

    if (this.state.errorInfo) {

      let errorCode = 0;
      let errorCodeText = "";
      let errorText = "";
      let errorDescription = "";
      if (this.state.error.toString().includes("404")){
        errorCode = 404;
        errorCodeText = t('errorCode') + "404"
        errorText = t('error404Text')
        errorDescription = t('error404Description')
      } else if (this.state.error.toString().includes("502") || this.state.error.toString().includes("505")){
        errorCode = 505;
        errorCodeText = t('errorCode') + "505"
        errorText = t('error502Text')
        errorDescription = t('error505Description')
      } else {
        errorText = t('errorUnknownText')
        errorDescription = t('errorUnknownDescription')
      }

      // Error path
      return (
        <div className="error-background">
          <Container className="error-container">
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
              <Col xs={12} lg={5} className="my-auto">
                  <Box className="title-error pb-1 px-lg-0 mx-lg-0 px-md-5 mx-md-5" fontFamily={secondaryFont} fontWeight={900}>
                    {errorText}
                  </Box>

                  <Box className="description-error my-4 my-md-2 my-lg-4 px-lg-0 mx-lg-0 px-md-5 mx-md-5" fontFamily={secondaryFont} fontWeight={500}>
                    {errorDescription}
                  </Box>

                  <Box className="code-error pt-2 pb-3" fontFamily={primaryFont} fontWeight={400} hidden={errorCode === 0}>
                    {errorCodeText}
                  </Box>

                  <details style={{ whiteSpace: 'pre-wrap', outline: 'none' }}  hidden={errorCode != 0}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </details> 

                  <Button className="button-login d-block mb-5 mt-4 mx-lg-0 mx-auto" color="primary" variant="contained" onClick={() => this.onClickRefresh()}><span className="text-case-unset">{t('BackToPage')}</span></Button>
                  <img width="200px" src="images\f3mfeelit-fundobranco.png" className="f3m-logo d-lg-block d-none" alt=""></img>

              </Col >
              <Col xs={12} lg={4} className="illustration-column">
                <Image src={errorCode === 0 ? illustrationError : errorCode === 404 ? illustration404 : illustration505} className="ilustration-error mx-lg-0 mx-auto mt-md-5 pt-md-0 pt-sm-5" fluid alt="logo" />
                <img width="200px" src="images\f3mfeelit-fundobranco.png" className="mx-auto d-lg-none d-md-block f3m-logo" alt=""></img>
              </Col>
            </Row>
          </Container>
        </div>
      );
   }
    // Normally, just render children
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);