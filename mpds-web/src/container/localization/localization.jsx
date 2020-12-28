import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//OUTSIDE COMPONENTS
import Image from 'react-bootstrap/Image';
import './localization.scss';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Moment from 'react-moment';

//ICONS
//CSS, STYLES & MEDIA ASSETS
import man_front from './svg/front_man.svg';
import man_back from './svg/back_man.svg';
import woman_front from './svg/front_woman.svg';
import woman_back from './svg/back_woman.svg';

//Actions
import { getWoundsOpened } from "../../store/actions/patient/patientActions"

//Constants

class LocalizationCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heightFront: 0,
      widthFront: 0,
      heightBack: 0,
      widthBack: 0
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {

    this.props.getWoundsOpened(this.props.patient.PatientID)


    let cardPElemFront = document.getElementById('cardPointFront')
    let cardPElemBack = document.getElementById('cardPointBack')


    this.setState({
      heightFront: parseFloat(cardPElemFront.offsetHeight),
      widthFront: parseFloat(cardPElemFront.offsetWidth),
      heightBack: parseFloat(cardPElemBack.offsetHeight),
      widthBack: parseFloat(cardPElemBack.offsetWidth)
    })

    window.addEventListener('resize', this.handleResize)

  }

  componentDidUpdate(){
    if (this.props.changeState){
      this.props.getWoundsOpened(this.props.patient.PatientID)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    let cardPElemFront = document.getElementById('cardPointFront')
    let cardPElemBack = document.getElementById('cardPointBack')


    this.setState({
      heightFront: parseFloat(cardPElemFront.offsetHeight),
      widthFront: parseFloat(cardPElemFront.offsetWidth),
      heightBack: parseFloat(cardPElemBack.offsetHeight),
      widthBack: parseFloat(cardPElemBack.offsetWidth)
    })
  }

  render() {
    const listWounds = this.props.patient.WoundsOpened || []
    const patientID = this.props.patient.PatientID || 0


    return (
      <Col className="my-4" xs={24} sm={12} md={12} lg={8} xl={6}>

        <div xs={24} sm={12} md={12} lg={10} xl={6} style={{ flexGrow: "1" }} className="container-cards">
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="card-localization my-auto">
              {/* <Col xs={12} sm={12} md={6} lg={5} xl={3} className="card-localization my-auto"> */}
              <div className="container-card">
                <div className="area-point mx-auto" id="cardPointFront">
                  <Image src={this.props.patient.PatientInfo.gender.startsWith('M') ? man_front : woman_front} />

                  {/* IMPORTANTE: está a fazer -5px, que é metade do tamanho do ponto. Se se alterar o tamanho do ponto isto tem que ser alterado */}
                  {listWounds.map((option, index) => (
                    <div class="point" id={"point" + index + patientID} hidden={option.posZ === -1 || option.isClosed} style={{ top: ((option.posY * this.state.heightFront) - 6) + 'px', left: ((option.posX * this.state.widthFront) - 6) + 'px' }}>

                      <div hidden={!(option.posX <= 0.5 && option.posY <= 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-6px", float: "left", textAlign: "right", width: "150px", color: "#494949" }}>
                        <div style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div style={{ color: "#494949", display: "flex", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX > 0.5 && option.posY < 0.5)} style={{ fontSize: "12px", marginRight: " 15px", marginTop: "-6px", float: "right", textAlign: "right", width: "150px", color: "#494949" }}>
                        <div style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div style={{ color: "#494949", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX < 0.5 && option.posY > 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-20px", float: "left", textAlign: "right", width: "150px", color: "#494949" }}>
                        <div style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div style={{ color: "#494949", display: "flex", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX > 0.5 && option.posY > 0.5)} style={{ fontSize: "12px", marginRight: "15px", marginTop: "-20px", float: "right", textAlign: "right", width: "150px", color: "#494949" }}>
                        <div style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div style={{ color: "#494949", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </Col>
            {/* </Col> */}

            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="card-localization my-auto">
              {/* <Col xs={12} sm={12} md={6} lg={5} xl={3} className="card-localization my-auto"> */}
              <div className="container-card " >
                <div className="area-point mx-auto" id="cardPointBack">
                  <Image src={this.props.patient.PatientInfo.gender.startsWith('M') ? man_back : woman_back} />

                  {listWounds.map((option, index) => (

                    <div class="point" id={"pointback" + index + patientID} hidden={option.posZ === 1 || option.isClosed} style={{ top: ((option.posY * this.state.heightBack) - 6) + 'px', left: ((option.posX * this.state.widthBack) - 6) + 'px' }}>
                      <div hidden={!(option.posX < 0.5 && option.posY < 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-6px", float: "left", textAlign: "right", width: "200px", color: "#494949" }}>
                        <div className="roboto-regular" style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div className="roboto-bold" style={{ color: "#494949", display: "flex" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX > 0.5 && option.posY < 0.5)} style={{ fontSize: "12px", marginRight: " 15px", marginTop: "-6px", float: "right", textAlign: "right", width: "200px", color: "#494949" }}>
                        <div className="roboto-regular" style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div className="roboto-bold" style={{ color: "#494949", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX < 0.5 && option.posY > 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-25px", float: "left", textAlign: "right", width: "200px", color: "#494949" }}>
                        <div className="roboto-regular" style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div className="roboto-bold" style={{ color: "#494949", display: "flex", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>

                      <div hidden={!(option.posX > 0.5 && option.posY > 0.5)} style={{ fontSize: "12px", marginRight: "15px", marginTop: "-25px", float: "right", textAlign: "right", width: "200px", color: "#494949" }}>
                        <div className="roboto-regular" style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{option.createdAt.toString()}</Moment></div>
                        <div className="roboto-bold" style={{ color: "#494949", fontWeight: "bold" }}>{option.intervention[0] !== undefined ? option.intervention[0].typology.type : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* </Col> */}
            </Col>
          </Row>
        </div>



      </Col>

      /*  </div > */
    )
  }
}

const mapStateToProps = state => ({ patient: state.patient });
const mapDispatchToProps = dispatch => bindActionCreators({ getWoundsOpened }, dispatch);
export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalizationCard))

