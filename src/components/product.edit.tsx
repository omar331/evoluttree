import * as React from 'react';

import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';

import './css/contents.css';

import GeneralInfoContainer from '../containers/general-info';
import PagesListContainer from '../containers/pages-list';

import ComponentsBar from './components.bar';

import { ProductEditProps,ProductEditState } from './model/ProductEditModel'


export default class ProductEditComponent extends React.Component<ProductEditProps, ProductEditState> {
    constructor(props:any) {
        super(props);
    }

    componentWillMount() {
        this.enterPageListMode()
    }

    /**
     * Get the base settings for each mode
     * @param mode
     * @returns {any}
     */
    getBaseModeSettings( mode:string) {
        const baseSettings = {
            'list': {
                componentsBarVisible: true,
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

    handlePageItemStartDrag(pageInfo:any) {
        this.props.onPageItemBeginDrag && this.props.onPageItemBeginDrag(pageInfo)
    }

    handlePageItemEndDrag(pageInfo:any) {
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
            modeSettings: this.getBaseModeSettings('list')
        })
    }

    render() {

        const { onStartEditPageBody, customComponents } = this.props
        const { mode } = this.state

        let stylePageEditor = {display: mode == 'page-edit' ? 'block' : 'none'}
        let stylePageListContainer = {display: mode == 'list' ? 'block' : 'none'}

        return(
            <div className="product-editing">
                <div id="product-editor-modal"></div>
                <Grid className="grid-product-edit">
                    <Row>
                        <Col md={this.state.modeSettings.contentMd}>
                            <GeneralInfoContainer />
                        </Col>
                    </Row>
                    {
                        this.state.modeSettings.componentsBarVisible ?
                            <Row>
                                <Col md={this.state.modeSettings.sideBarMd} className="component-bar">
                                    <ComponentsBar />
                                </Col>
                            </Row>
                            :
                            null
                    }
                    <Row>
                        <Col md={this.state.modeSettings.contentMd} className="pages-container" >
                            <div id="page-body-editor" style={ stylePageEditor }>
                            </div>
                            <div style={ stylePageListContainer }>
                                <PagesListContainer
                                    onStartEditPageBody={this.enterPageEditMode.bind(this)}
                                    onFinishEditPageBody={this.enterPageListMode.bind(this)}
                                    customComponents={customComponents}
                                    onPageItemBeginDrag={this.handlePageItemStartDrag.bind(this)}
                                    onPageItemEndDrag={this.handlePageItemEndDrag.bind(this)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
