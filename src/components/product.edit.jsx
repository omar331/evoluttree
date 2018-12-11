import * as React from 'react';

import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';

import * as _ from 'lodash'
import { PropTypes } from 'prop-types'

import PagesListContainer from '../containers/pages-list.jsx';
import ComponentsBarContainer from '../containers/components-bar.jsx';

//import { ProductEditProps,ProductEditState } from './model/ProductEditModel'


export default class ProductEditComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treeCollapseExpandedState: props.treeCollapseExpandedState
        }
    }

    componentWillMount() {
        this.enterPageListMode()
    }

    componentWillReceiveProps(nextProps) {
        const { onChangeExpandedCollapseTreeState } = this.props

        if ( ! _.isEqual(this.state.treeCollapseExpandedState, nextProps.treeCollapseExpandedState) ) {

            if ( onChangeExpandedCollapseTreeState ) onChangeExpandedCollapseTreeState(nextProps.treeCollapseExpandedState)

        }
    }



    /**
     * Get the base settings for each mode
     * @param mode
     * @returns {any}
     */
    getBaseModeSettings( mode) {
        const baseSettings = {
            'list': {
                componentsBarVisible: true,
                sideBarMd: 12,
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

    handleChangeTreeState(localId,info) {
        console.log( "     change tree state =   %s     %o", localId, info )
    }

    render() {
        const { onStartEditPageBody, customComponents, pageStyles } = this.props
        const { mode } = this.state

        let stylePageEditor = {display: mode == 'page-edit' ? 'block' : 'none'}
        let stylePageListContainer = {display: mode == 'list' ? 'block' : 'none'}

        return(
            <div id={"page-tree"}>

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
                                onChangeTreeState={ this.handleChangeTreeState.bind(this) }
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

ProductEditComponent.propTypes = {

    /* Estado de expansão/colapso da árvore */
    treeCollapseExpandedState: PropTypes.object,
}
