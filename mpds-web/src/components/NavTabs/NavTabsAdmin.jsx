import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

//OUTSIDE COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'react-bootstrap/Image';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dropdown from 'react-bootstrap/Dropdown';

//CSS, STYLES & MEDIA ASSETS
import logo_icon from '../../utils/icon_MPDS.svg';
import variables from "../../assets/bootstrap/scss/_variables.scss"

//ICONS
import SaveIcon from '@material-ui/icons/Save';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';

const secondaryFont = variables.secondaryFont

const styles = theme => ({
    bigIndicator: {
        height: 4,
    },

});

class NavTabsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indexTabs: 0,
            scrolled: false,
            saveEnable: false
        }

        this.onChangeScroll = this.onChangeScroll.bind(this)
    }

    handleChangeTabs = (event, value) => {
        if (!this.state.saveEnable){
            this.setState({
                indexTabs: value
            })
            this.props.onChangeTabs(value)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onChangeScroll);
    }

    componentDidUpdate() {
        if (this.state.indexTabs !== this.props.indexTabsParent) {
            this.setState({ indexTabs: this.props.indexTabsParent })
        }
        if (this.state.saveEnable !== this.props.saveEnable) {
            this.setState({ saveEnable: this.props.saveEnable })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onChangeScroll);
    }

    onChangeScroll() {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 144,
            headerE = document.getElementById("nav-container-admin")

        if (distanceY > shrinkOn) {
            headerE.classList.add("fixed-nav-admin")
            this.setState({ scrolled: true })
        } else {

            headerE.classList.remove("fixed-nav-admin")
            this.setState({ scrolled: false })
        }
    }

    updateInstitutionsParam() {
        this.props.onUpdate()
    }

    saveInstitutionsParam() {
        this.props.onSave()
    }

    cancelInstitutionsParam() {
        this.props.onCancel()
    }

    addUser() {
        this.props.addUser()
    }

    render() {
        const { t } = this.props;
        const { classes } = this.props;

        const CustomToggleInstitution = React.forwardRef(({ children, onClick }, ref) => (
            <a
                className="text-decoration-none font-weight-bold d-block"
                ref={ref}
                href={this.props.login.userAcess.wounds ? "/" : ""}
                onClick={e => {
                e.preventDefault();
                onClick(e);
                }}
            >
        
                <Box fontFamily={secondaryFont} fontWeight={700} fontSize={14} className="inst-dropdown d-block">         
                    <span className={`pt-3 dropdown-tab-item text-uppercase text-right pr-2 ${this.state.indexTabs === 1 ? "companies-fix" : ""}`}>
                        {this.state.indexTabs === 0 ? t('Users') : t('Companies')}
                    </span> 
                    <ExpandMoreIcon className="mt-2" fontSize='large' />
                </Box>
            </a>
        ));

        let BackAndTabs =
        <>
            <div className='mt-3 nav-container sticky-navBar-Admin d-flex border-nav ' id="nav-container-admin" hidden={!this.props.login.userAcess.settings || this.props.login.getAllInfoInProgress}>
                <div className="container d-flex">
                  
                {
                    (this.state.scrolled ? (
                        <ButtonBase
                            className="outline-none"
                            disableRipple
                            disableTouchRipple
                            focusRipple
                            variant="contained"
                            type="submit"
                            href={this.props.login.userAcess.wounds ? "/" : ""}>
                            <Image
                                fluid
                                src={logo_icon}
                                height="30"
                                width="30"
                                className="mr-5"
                                alt="logo" />
                        </ButtonBase>
                    ) : (
                            null
                        ))
                }
                   
                        <Dropdown className="d-block d-lg-none dropdown-tabs">
                        <Dropdown.Toggle as={CustomToggleInstitution}></Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="pt-3 pb-4 dropdown-list">
                            <Dropdown.Item as="button" className="dropdown-list-item text-uppercase" active={this.state.indexTabs === 0} onClick={(v) => this.handleChangeTabs(v,0)} eventKey={0} >{t('Users')}</Dropdown.Item>
                            <Dropdown.Item as="button" className="dropdown-list-item text-uppercase" active={this.state.indexTabs === 1} onClick={(v) => this.handleChangeTabs(v,1)} eventKey={1} >{t('Companies')}</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                 
                        <Tabs
                            className="w-100 navbar-tab-height d-lg-block d-none"
                            classes={{ indicator: classes.bigIndicator }}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event,value) => this.handleChangeTabs(event, value)}
                            value={this.state.indexTabs}>
                            <Tab label={t('Users')} key={0} />
                            <Tab label={t('Companies')} key={1} />
                        </Tabs>
                        <div className="ml-0 ml-md-4 ml-lg-0 edit-controls" hidden={this.state.indexTabs !== 1}>
                            <IconButton color="primary"
                                className="bottom-5px outline-none"
                                onClick={() => this.updateInstitutionsParam()}
                                disabled={this.props.login.isLoading || this.state.saveEnable}
                                centerRipple={true}
                            >
                                <CreateIcon fontSize='large' />
                            </IconButton>
                            <IconButton color="primary"
                                className="bottom-5px outline-none"
                                onClick={() => this.saveInstitutionsParam()}
                                disabled={this.props.login.isLoading || !this.state.saveEnable}
                                centerRipple={true}
                                id="saveButtonAdmin"
                            >
                                <SaveIcon fontSize='large' />
                            </IconButton>
                            <IconButton color="primary"
                                className="bottom-5px outline-none"
                                onClick={() => this.cancelInstitutionsParam()}
                                disabled={this.props.login.isLoading || !this.state.saveEnable}
                                centerRipple={true}
                            >
                            <ClearIcon fontSize='large'/>
                        </IconButton>
                        </div>
                        <IconButton color="primary"
                            className="add-icon outline-none"
                            onClick={() => this.addUser()}
                            hidden={this.state.indexTabs !== 0}
                            disableFocusRipple
                            disableRipple
                            disabled={this.props.login.isLoading}
                        >
                            <PersonAddIcon fontSize='large'></PersonAddIcon>
                        </IconButton>
                 
                </div >
            </div >
        </>
        return (
            <>
                {BackAndTabs}
            </>
        )
    }
}


const mapStateToProps = state => ({ login: state.login });
export default withTranslation()(connect(
    mapStateToProps,
    null
)(withStyles(styles)(NavTabsAdmin)))
