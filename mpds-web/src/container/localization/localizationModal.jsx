import React, { Component } from "react";
import { connect } from "react-redux";
//OUTSIDE COMPONENTS
import Image from 'react-bootstrap/Image';
import './localization.scss';
import Moment from 'react-moment';

//ICONS
//CSS, STYLES & MEDIA ASSETS
import man_front from './svg/front_man.svg';
import man_back from './svg/back_man.svg';
import woman_front from './svg/front_woman.svg';
import woman_back from './svg/back_woman.svg';



//Actions
//Constants

class LocalizationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heightFront: 0,
            widthFront: 0,
        }
    }

    componentDidMount() {
        let cardPElemFront = document.getElementById('cardPointModal')

        this.setState({
            heightFront: parseFloat(cardPElemFront.offsetHeight),
            widthFront: parseFloat(cardPElemFront.offsetWidth),
        })

    }

    render() {
        const listWounds = this.props.patient.Wounds || []
        const wound = listWounds[this.props.indexWound]

        let tipoFerida
        if (this.props.patient.PatientInfo.gender.startsWith('M')) {
            // HOMEM
            if (wound.posZ === -1) {
                tipoFerida = man_back
            } else {
                tipoFerida = man_front
            }
        } else {
            // MULHER
            if (wound.posZ === -1) {
                tipoFerida = woman_back
            } else {
                tipoFerida = woman_front
            }
        }


        return (
            <>

                {/* IMPORTANTE: está a fazer -6px, que é metade do tamanho do ponto. Se se alterar o tamanho do ponto isto tem que ser alterado */}
                <div className="container-card">
                    <div className={`area-point ${this.props.areaClasses}`} id="cardPointModal">
                        <Image src={tipoFerida} />
                        <div className={wound.isClosed ? "pointClosed" : "point"} id={"pointModal"} style={{ top: ((wound.posY * this.state.heightFront) - 6) + 'px', left: ((wound.posX * this.state.widthFront) - 6) + 'px' }}>
                            <div hidden={!(wound.posX <= 0.5 && wound.posY <= 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-6px", float: "left", textAlign: "right", width: "200px", color: "#494949" }}>
                                <div className="roboto-regular" style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{wound.createdAt.toString()}</Moment></div>
                                <div className="roboto-bold" style={{ color: "#494949", display: "flex", fontWeight: "bold" }}>{wound.intervention[0].typology.type}</div>
                            </div>

                            <div hidden={!(wound.posX > 0.5 && wound.posY < 0.5)} style={{ fontSize: "12px", marginRight: " 15px", marginTop: "-6px", float: "right", textAlign: "right", width: "200px", color: "#494949" }}>
                                <div className="roboto-regular" style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{wound.createdAt.toString()}</Moment></div>
                                <div className="roboto-bold" style={{ color: "#494949", fontWeight: "bold" }}>{wound.intervention[0].typology.type}</div>
                            </div>

                            <div hidden={!(wound.posX < 0.5 && wound.posY > 0.5)} style={{ fontSize: "12px", marginLeft: "15px", marginTop: "-20px", float: "left", textAlign: "right", width: "200px", color: "#494949" }}>
                                <div className="roboto-regular" style={{ color: "#494949", display: "flex", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{wound.createdAt.toString()}</Moment></div>
                                <div className="roboto-bold" style={{ color: "#494949", display: "flex", fontWeight: "bold" }}>{wound.intervention[0].typology.type}</div>
                            </div>

                            <div hidden={!(wound.posX > 0.5 && wound.posY > 0.5)} style={{ fontSize: "12px", marginRight: "15px", marginTop: "-20px", float: "right", textAlign: "right", width: "200px", color: "#494949" }}>
                                <div className="roboto-regular" style={{ color: "#494949", marginBottom: "-5px" }}><Moment format="DD.MM.YYYY" >{wound.createdAt.toString()}</Moment></div>
                                <div className="roboto-bold" style={{ color: "#494949", fontWeight: "bold" }}>{wound.intervention[0].typology.type}</div>
                            </div>
                        </div>
                    </div>
                </div>


            </>

        )
    }
}

const mapStateToProps = state => ({ patient: state.patient });
export default (connect(
    mapStateToProps,
    null
)(LocalizationModal))