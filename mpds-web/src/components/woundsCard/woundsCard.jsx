import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// OUTSIDE COMPONENTS

// CSS, STYLES & MEDIA ASSETS
import './woundsCard.scss';

class woundsCard extends React.Component {
  render() {
    const { t } = this.props;

    return ' ';
    /*   let carousel
        if (this.state.indexWoundCarousel != -1) {
            carousel = <AutoRotatingCarousel
                //label='Get started'
                open={this.state.openCarousel}
                onClose={() => this.handleShowCarousel(false, -1)}
                //onStart={() => this.handleShowCarousel(false, -1)}
                style={{ position: 'absolute' }}
            >
                {listWounds[this.state.indexWoundCarousel].intervention.map(option => (

                    option.woundPhoto.map(optionPhoto => (
                        <Slide
                            media={<img src={optionPhoto.photoUri} />}
                            mediaBackgroundStyle={{ backgroundColor: "red[400]" }}
                            style={{ backgroundColor: " red[600]" }}
                        //title='This is a very cool feature'
                        //subtitle='Just using this will blow your mind.'
                        />
                    ))

                ))}
            </AutoRotatingCarousel>
        } else {
            carousel = <div></div>
        }
        
        //to check when element get's position sticky
        return (
            <>
            <Row>
                <Paper>
                    <Row className="pt-1" >
                        <Col sm={3}>
                            <label> {wound.intervention[wound.intervention.length - 1].typology}</label>
                        </Col>
                        <Col sm={3} align="right">
                            <ButtonBase fontSize="large" className="mr-1" color={wound.isClosed ? "red" : "text.secondary"} variant="contained" type="submit" onClick={v => { wound.isClosed ? this.handleOpenDialog(true, wound.intervention[0].woundId) : this.handleCloseDialog(true, wound.intervention[0].woundId) }}>
                                <Box
                                    color={wound.isClosed ? "red" : "text.secondary"}
                                    className="font-weight-bold">
                                    {wound.isClosed ? t('OpenWound') : t('CloseWound')}
                                </Box>
                            </ButtonBase>
                            <Dialog
                                open={this.state.openDialogMsg}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{t('OpenWound')}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {t('confirmOpenWound')}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={v => this.onClickOpenOrCloseWound("Open", this.state.idWoundOpenOrClose)} color="primary">
                                        {t('Yes')}
                                    </Button>
                                    <Button onClick={v => this.handleOpenDialog(false, 0)} color="primary" autoFocus>
                                        {t('No')}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.closeDialogMsg}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{t('CloseWound')}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {t('confirmCloseWound')}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={v => this.onClickOpenOrCloseWound("Close", this.state.idWoundOpenOrClose)} color="primary">
                                        {t('Yes')}
                                    </Button>
                                    <Button onClick={v => this.handleCloseDialog(false, 0)} color="primary" autoFocus>
                                        {t('No')}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Col>
                    </Row>

                    <Carousel centerMode centerSlidePercentage={80} width="300px" showThumbs={false} onClickItem={v => this.handleShowCarousel(true, index)}>
                        {wound.intervention.map(option => (

                            option.woundPhoto.map(optionPhoto => (
                                <div>
                                    <img src={optionPhoto.photoUri} />
                                </div>
                            ))

                        ))}
                    </Carousel>

                    {carousel}

                    <Row>
                        <Col>
                            <ButtonBase
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                variant="contained"
                                type="submit"
                                onClick={v => this.onClickCharacterisationOrReport(1, wound.intervention[0].woundId)}>
                                <Box
                                    color="text.secondary"
                                    className="font-weight-bold">
                                    {t('Characterisation')}
                                </Box>
                            </ButtonBase>
                        </Col>
                        <Col>
                            <ButtonBase
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                variant="contained"
                                type="submit"
                                onClick={v => this.onClickCharacterisationOrReport(2, wound.intervention[0].woundId)}>
                                <Box
                                    color="text.secondary"
                                    className="font-weight-bold">
                                    {t('Report')}
                                </Box>
                            </ButtonBase>
                        </Col>
                        <Col>
                            <ButtonBase
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                variant="contained"
                                type="submit"
                            //    onClick={v => this.onClickCaracterizacao(wound.intervention[0].woundId)}
                            >
                                <Box
                                    color="text.secondary"
                                    className="font-weight-bold">
                                    {t('2ndOpinion')}
                                </Box>
                            </ButtonBase>
                        </Col>
                    </Row>
                </Paper>
            </Row >
        </>
        ) */
  }
}

export default woundsCard;
