import * as React from 'react';

import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';

import './css/contents.css';

import PagesListContainer from '../containers/pages-list.jsx';
import ComponentsBarContainer from '../containers/components-bar.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";

export default class ProductEditComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
        }
    }

    componentWillMount() {
        this.enterPageListMode()
    }

    /**
     * Get the base settings for each mode
     * @param mode
     * @returns {any}
     */
    getBaseModeSettings( mode) {
        const baseSettings = {
            'list': {
                componentsBarVisible: false,
                sideBarMd: 2,
                contentMd: 10,
            },
            'page-edit': {
                componentsBarVisible: false,
                sideBarMd: 0,
                contentMd: 12,
            },
        }

        return baseSettings[mode]
    }

    handlePageItemStartDrag(pageInfo) {
        this.props.onPageItemBeginDrag && this.props.onPageItemBeginDrag(pageInfo)
    }

    handlePageItemEndDrag(pageInfo) {
        this.props.onPageItemEndDrag && this.props.onPageItemEndDrag(pageInfo)
    }

    enterPageEditMode(elementId, pageInfo) {
        const { onStartEditPageBody } = this.props

        this.setState({
            mode: 'page-edit',
            modeSettings: this.getBaseModeSettings('page-edit')
        })

        if ( onStartEditPageBody ) onStartEditPageBody(elementId, pageInfo)
    }

    enterPageListMode() {
        this.setState({
            mode: 'list',
            modeSettings: this.getBaseModeSettings('list'),
        })
    }

    handleClickCollapsed(e)
    {
        e.preventDefault();
        const {collapsed} = this.state;
        let show = !collapsed;

        this.setState({
            collapsed: show
        }  )

    }

    renderCollapseBar()
    {
        return <a onClick={this.handleClickCollapsed.bind(this)} id={"collapse-button"}>
            <span id={"arrow-left"}><FontAwesomeIcon icon={faAngleDoubleLeft} /></span>
            <span id={"arrow-right"}><FontAwesomeIcon icon={faAngleDoubleRight}/></span>
        </a>
    }

    render() {

        const { onStartEditPageBody, customComponents, pageStyles } = this.props
        const { mode, collapsed } = this.state

        let stylePageEditor = {display: mode == 'page-edit' ? 'block' : 'none'}
        let stylePageListContainer = {display: mode == 'list' ? 'block' : 'none'}

        let collapseClass = (collapsed)?"collapsed":""

        return(
            <div id={"page-tree"} className={collapseClass}>

                { this.renderCollapseBar() }

                <div id={"product-editor-modal"}></div>
                {
                    this.state.modeSettings.componentsBarVisible ?
                        <Row>
                            <Col md={this.state.modeSettings.sideBarMd} className="component-bar">
                                <ComponentsBarContainer />
                            </Col>
                        </Row>
                        :
                        null
                }
                <div id={"page-tree-list"}>
                    <div md={12}>
                        {/* Custom editor */}
                        <div id="page-body-editor" style={ stylePageEditor }></div>

                        <div style={ stylePageListContainer }>
                            <PagesListContainer
                                onStartEditPageBody={this.enterPageEditMode.bind(this)}
                                onFinishEditPageBody={this.enterPageListMode.bind(this)}
                                customComponents={customComponents}
                                onPageItemBeginDrag={this.handlePageItemStartDrag.bind(this)}
                                onPageItemEndDrag={this.handlePageItemEndDrag.bind(this)}
                                pageStyles={pageStyles}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
