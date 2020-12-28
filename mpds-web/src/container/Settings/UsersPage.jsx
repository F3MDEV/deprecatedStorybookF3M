import React from "react";
import { withTranslation } from "react-i18next";

import {isDefined} from "../../utils/utils";

import UsersGrid from "./usersGrid"

//OUTSIDE COMPONENTS
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

//ICONS
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';

//CSS
import "./UsersPage.scss"

class UsersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listInstOrigin: [],
            listInst: [],
            searchValue: "",
            activeTerms: "",
            inactiveTerms: ""
        }
    }

    componentDidMount(){
        this.setState({
            activeTerms: this.getActiveTerms(),
            inactiveTerms: this.getInactiveTerms()
        })
    }

    static getDerivedStateFromProps(nextProps, state){
        if (nextProps.listInst !== state.listInst || nextProps.searchValue !== state.searchValue){
            if (state.searchValue.trim().length >= 3 && nextProps.listInst.length > 0){
                // when is filtered updates the list with the expand values
                let list = UsersPage.searchList(state.searchValue.trim(), nextProps.listInst, state.activeTerms, state.inactiveTerms);

                return {
                    listInstOrigin: nextProps.listInst,
                    listInst: list//listFilter
                }
            } 
            else{
                return {
                    listInstOrigin: nextProps.listInst,
                    listInst: nextProps.listInst
                }
            }         
        }
        else return null;
    }

    static searchList = (searchTerms, listToSearch, activeTerms, inactiveTerms) =>{
        let search = searchTerms.trim().toUpperCase();
        let searchArr = search.split(" ");
        let listResult = [];
        let numSearchTerms = searchArr.length;

        // THE RESULT RETURN ALL ITEMS THAT HAVE AT ALL THE SEARCH TEARMS IN CORRECT ORDER
        for (let i = 0; i < numSearchTerms; i++){
            let listSearch = []
            if (i === 0){
                // for 1ª word search in original list
                listSearch = listToSearch
            } else {
                // search in filter list
                listSearch = listResult
                // listResult is empty to refresh with the current search
                listResult = []
            }

            let searchTerm = searchArr[i];

            let maxj = listSearch.length
            for (let j = 0; j < maxj; j++){
                let instOrig = listSearch[j]
                let users = instOrig.institutionUsers;
                let institutionAdded = false;
                let numUsers = users.length;

                for(let k = 0; k < numUsers; k++){
                    let user = users[k];
                    let adiciona = false;

                    if (user.name.toUpperCase().includes(searchTerm) || user.rowKey.toUpperCase().includes(searchTerm)){
                        adiciona = true;
                    } else if ((isDefined(user.specialty) && user.specialty.toUpperCase().includes(searchTerm))) {
                        adiciona = true;
                    } else if (isDefined(user.profile.name) && user.profile.name.toUpperCase().includes(searchTerm)) {
                        adiciona = true;
                    }

                    if (adiciona)
                    {
                        if (!institutionAdded){
                            let institution = {
                                name: instOrig.name,
                                rowKey: instOrig.rowKey,                                    
                                institutionUsers: [],
                                expanded: instOrig.expanded
                            };
                            listResult.push(institution);
                            institutionAdded = true;
                        }
                        listResult[listResult.length - 1].institutionUsers.push(user);
                    }
                }
            }
        }

        return listResult;
    }

    getActiveTerms = () => {
        const {t} = this.props;
        return t('Active');
    }

    getInactiveTerms = () => {
        const {t} = this.props;
        return t('Inactive');
    }

    onChangeSearch = (event) => {
        let search = (event.target.value || "").trim()
        let listResult = [];

        if (search.length >= 3){
            // when force expandAll = true, the getDerivedStateFromProps aplly the search.
            // don't need to do
            //listResult = UsersPage.searchList(search, this.state.listInstOrigin)
            this.props.expandAll(true)
        }  else {
            listResult = this.state.listInstOrigin;
        } 

        this.setState({
            searchValue: event.target.value,
            listInst: listResult
        }) 
    }

    expandCloseAll() {
        this.props.expandAll(false)
    }

    onChangeExpanded(v, rowKey) {
        this.props.expand(rowKey)
    }

    selectUser(keyUser) {
        this.props.showUser(keyUser)
    }

    resetPasswordUser(keyUser) {
        this.props.resetPassword(keyUser)
    }

    deleteUser(keyUser, nameUser, institutionRowKey, institutionName) {
        this.props.deleteUser(keyUser,nameUser, institutionRowKey, institutionName)    
    }

    render() {
        const { t } = this.props;

        const listInst = this.state.listInst || []
        
        return (
            <>
                 <Row className="justify-content-between">
                    <Col xs={12} md={5} className="my-auto">
                        <FormControl className="w-100 mt-3 mb-4 mb-lg-2 search search-users-page">
                            <Input
                                id="input-with-icon-adornment-user"
                                placeholder={t("seach_users_terms")}
                                className="font-size-12-px"
                                //autoComplete={"MpDS-Filter-User"}
                                autoComplete={'off'}
                                onChange={(v) => this.onChangeSearch(v)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                                value={this.state.searchValue}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.searchValue.length >= 1 ? <IconButton
                                            size='small'
                                            onClick={() => this.setState({
                                                searchValue: "",
                                                listInst: this.state.listInstOrigin
                                            })
                                            }>
                                            <CloseIcon size='small' />
                                        </IconButton> : null}
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Col>

                    <Col xs={12} md={3} className="align-self-end mb-2 mb-md-0">
                        <Button aria-label="f3m"
                            onClick={() => this.expandCloseAll()} 
                            className="float-right outline"
                            disableFocusRipple
                            disableRipple
                            endIcon={!this.props.isAllExpanded ? <UnfoldMoreIcon fontSize="default" color="primary" className="mb-2 mb-md-4 mb-lg-1"/> : <UnfoldLessIcon fontSize="default" color="primary" className="mb-2 mb-md-4 mb-lg-1"/>}>
                               {!this.props.isAllExpanded ? <span className="mb-2 mb-md-4 mb-lg-1 text-capitalize font-size-13-px roboto-regular primary-color">{t("allOpen")}</span> : <span className="mb-2 mb-md-4 mb-lg-1 text-capitalize roboto-regular primary-color">{t("allClose")}</span>}
                        </Button>
                    </Col>
                </Row>

                <div className="expanded-panels-container">
                    {listInst.map((institution, index) => (
                        <ExpansionPanel
                            key={institution.rowKey}
                            expanded={institution.expanded}
                            className="expanded-institution"
                            onChange={(v) => this.onChangeExpanded(v, institution.rowKey)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={"panel-Inst-header" + index}>
                                <Typography className="institution-title nunito-regular pt-1">{institution.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                { institution.institutionUsers !== undefined ? 
                                <UsersGrid 
                                    institution={institution} 
                                    listUsers={institution.institutionUsers} 
                                    selectUser={(rowKey) => this.selectUser(rowKey)} resetPasswordUser={(rowKey) => this.resetPasswordUser(rowKey)} 
                                    deleteUser={(userRowKey, userName, institutionRowKey, institutionName) => this.deleteUser(userRowKey, userName, institutionRowKey, institutionName)}
                                    actualUser={this.props.actualUser}
                                    actualInstitution={this.props.actualInstitution}
                                ></UsersGrid>
                                :  
                                <></>
                                }
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
            </>
        );
    }
}

export default withTranslation()(UsersPage)


