import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import Autosuggest from 'react-autosuggest';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Trans } from 'react-i18next'

import { getPatientsSearch } from "../../../store/actions/Module_wounds/woundsActions"
import "./woundsSearch.scss";

import FormControl from '@material-ui/core/FormControl';
import PatientIcon from '../../../utils/account-circle.svg';

//ICONS
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

//OUTSIDE COMPONENTS
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Box from '@material-ui/core/Box';


function renderSuggestion(suggestion, { query }) {
    let suggestionText =
        <>
            <b>{suggestion.type}:</b> {suggestion.identification}
        </>

    let internmentRoom
    if (suggestion.internment.length > 0) {
        internmentRoom =
            <>
                <span className="a"> <span className="font-weight-bold"> <Trans i18nKey="WoundsPage.RoomAbbreviation">Q</Trans>: </span>  {suggestion.internment[suggestion.internment.length - 1].room}</span>
            </>
    } else {
        internmentRoom = <div></div>
    }

    let internmentBed
    if (suggestion.internment.length > 0) {
        internmentBed =
            <>
                <span className="a"> <span className="font-weight-bold"> <Trans i18nKey="WoundsPage.BedAbbreviation">C</Trans>:</span> {suggestion.internment[suggestion.internment.length - 1].bed}</span>
            </>
    } else {
        internmentBed = <div></div>
    }

    return (
        <span className="name search-">
            <Row className="no-gutters ">
                <Col xs={12} sm={7} className="my-auto pl-6">
                    <Box fontWeight="fontWeightMedium" className="ellipsis-search">
                        <Image className={"text-left mr-md-5 mr-4 fit-photo" + (suggestion.photoURI === "" || suggestion.photoURI === null ? "" : " border-img-grd")}
                            width="35" height="35" roundedCircle
                            src={suggestion.photoURI === "" || suggestion.photoURI === null ? PatientIcon : suggestion.photoURI}
                            onError={(event) => {event.target.src = PatientIcon; event.target.src = "text-left mr-md-5 mr-4"}}
                        ></Image>
                        {suggestion.name}
                    </Box>
                </Col>
                <Col xs sm={2} className="pt-2 pl-6 pl-sm-0 pt-sm-0 my-auto mx-auto">
                    <Box fontWeight="fontWeightRegular" className="text-center">
                        {suggestionText}
                        {/* quarto e cama */}
                    </Box>
                </Col>
                <Col xs sm={1} className="pt-2 pt-sm-0 my-auto mx-auto">
                    <Box fontWeight="fontWeightRegular" className="text-center ">
                        {internmentRoom}
                    </Box>
                </Col>
                <Col xs sm={1} className="pt-2 pt-sm-0 my-auto mx-auto">
                    <Box fontWeight="fontWeightRegular" className="text-center ">
                        {internmentBed}
                    </Box>
                </Col>
            </Row>
        </span>
    );
}

class WoundsSearch extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }


    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });

    };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.trim().length >= 3) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                //search function
                this.props.getPatientsSearch(value)
            }, 300);
        }

    };

    onSuggestionsSelect = (value) => {
        if (parseInt(value.id) !== 0) {
            let id = value.id

            this.setState({
                value: ""
            })

            this.props.selectPatient(id)
        }

        return ``;
    }

    onSuggestionsClearRequested = () => {
        //this.props.listSearch = []

        /*this.setState({
            value: ""
        })*/
    };

    shouldRenderSuggestions = (value) => {
        return value.trim().length >= 3
    }

    render() {
        const { value } = this.state;
        const { t } = this.props;

        const inputProps = {
            placeholder: t('PatientOrSNS'),
            value,
            onChange: this.onChange,
            classes: "mr-3",
        };

        const renderInputComponent = inputProps => (
            <div>
                <FormControl className="w-100 search pr-4">
                    <Input
                        id="input-with-icon-adornment"
                        {...inputProps}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                {value.length >= 1 ? <IconButton
                                    size='small'
                                    onClick={() => this.setState({
                                        value: ""
                                    })
                                    }>
                                    <CloseIcon size='small' />
                                </IconButton> : null}
                            </InputAdornment>
                        }
                    />
                  
                </FormControl>
            </div>
        );

        //var list = this.props.listSearch || []
        //list = list.slice(0, 10) // para apresentar apenas o top 10 dos resultados da pesquisa

        return (
            <Autosuggest
                //Styles in woundsSearch.css
                suggestions={this.props.listSearch}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                getSuggestionValue={this.onSuggestionsSelect}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={renderInputComponent} />
        );
    }
}

const mapStateToProps = state => ({ listSearch: state.wounds.listSearch });
const mapDispatchToProps = dispatch =>
    bindActionCreators({ getPatientsSearch }, dispatch);
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(WoundsSearch))

