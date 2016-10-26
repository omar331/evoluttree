import * as React from 'react';

import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';

import './css/contents.css';

import GeneralInfoContainer from '../containers/general-info';
import PagesListContainer from '../containers/pages-list';

import ComponentsBar from './components.bar';

import { ProductEditProps } from './model/ProductEditProps'


export default class ProductEditComponent extends React.Component<ProductEditProps, {mode:string}> {
    constructor(props:any) {
        super(props);

        // mode = might be 'list' or 'page-edit'
        this.state = {
            mode: 'list'
        }
    }
    handlePageItemStartDrag(pageInfo:any) {
        this.props.onPageItemBeginDrag && this.props.onPageItemBeginDrag(pageInfo)
    }
    handlePageItemEndDrag(pageInfo:any) {
        this.props.onPageItemEndDrag && this.props.onPageItemEndDrag(pageInfo)
    }
    handleStartEditPageBody(elementId, pageInfo) {
        const { onStartEditPageBody } = this.props

        this.setState({mode: 'page-edit'})

        onStartEditPageBody(elementId, pageInfo)
    }
    handleFinishEditPageBody(elementId, pageInfo) {
        this.setState({mode: 'list'})
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
                        <Col md={2}>

                        </Col>
                        <Col md={10}>
                            <GeneralInfoContainer />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} className="component-bar">
                            <ComponentsBar />
                        </Col>
                        <Col md={10} className="pages-container" >
                            <div id="page-body-editor" style={ stylePageEditor }>
                            </div>
                            <div style={ stylePageListContainer }>
                                <PagesListContainer
                                    onStartEditPageBody={this.handleStartEditPageBody.bind(this)}
                                    onFinishEditPageBody={this.handleFinishEditPageBody.bind(this)}
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
