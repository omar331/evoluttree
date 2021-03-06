import * as React from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { fromJS } from 'immutable';

import { PropTypes } from 'prop-types'

import ProductEditContainer from './containers/product-edit.jsx';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import { replaceState, pageJustChangedSanitize, changeContent } from './actions/products.jsx';

import productReducer from './reducers/product';

import * as productHelper from './helper/productHelper.jsx';

import * as sampleSettings from './misc/sampleSettings.tsx';

import onChangeMiddleWare from './middlewares/content-change-middleware.jsx'
import onTitleChangeCallback from './middlewares/title-change-middleware.jsx'
import onExpandCollapseCallback from './middlewares/expand-collapse-nodes-middleware.jsx'

// import * as clientApi from './client-api.tsx';
import _ from 'lodash'

import './components/css/main.scss'

class App extends React.Component {

    constructor(props) {
        super(props);

        //noinspection TypeScriptUnresolvedVariable
        const { config, onChange, onTitleChange } = this.props;

        let editingProduct = props.editingProduct;

        // ---> if no editing information are provided, get the sample
        if ( editingProduct === undefined || editingProduct === null ) editingProduct = sampleSettings.editingProduct;

        // ensure every editing product has a local id
        editingProduct = productHelper.prepareEditingProduct(editingProduct);
        editingProduct.misc = {
            pageItemBeingDragged: undefined,

            // pages just changed
            pagesJustChanged: fromJS([])
        };

        // populates initial state with editing product
        const initialState = fromJS({
            editing: editingProduct,
            contentChanged: false
        });


        const middlewareChain = applyMiddleware(
            onChangeMiddleWare(onChange),
            onTitleChangeCallback(onTitleChange),
            onExpandCollapseCallback(this.handleExpandCollapse.bind(this))
        )

        this.store = createStore(
            productReducer,
            {},
            middlewareChain
        );

        // Expose client API 
        // clientApi.expose(this.store);

        this.store.dispatch( replaceState(initialState) );


        // just changed sanitize
        // window.setInterval( () => {
        //     this.store.dispatch( pageJustChangedSanitize() );
        // }, 5000 );

        this.state = {
            treeState: []
        }
    }


    componentWillReceiveProps(nextProps) {

        console.log("evolutree_app_nextprops", nextProps);

        this.setState({treeState: nextProps.treeState})

        if ( ! _.isEqual(this.state.treeCollapseExpandedState, nextProps.treeCollapseExpandedState) ) {
            this.setState({treeCollapseExpandedState: nextProps.treeCollapseExpandedState} )
        }

        /* Criado para facilitar o mecanismo de undo */
         // this.store.dispatch( {
         //     type: 'UPDATE_EDITING_PAGES',
         //     editingPages: fromJS(nextProps.editingProduct.pages)
         // } )
    }


    /**
     * Quando ocorre uma atualização no estado de contração/expansão da árvore,
     * os nós que estão expandidos são obtidos a partir do estado da aplicação,
     * do produto que está sendo editado.
     *
     *
     */
    handleExpandCollapse() {
        const { onExpandCollapseNode } = this.props

        const expandedNodes = productHelper.getExpandCollapseTreeState( this.store.getState().get('editing') )

        if ( onExpandCollapseNode ) onExpandCollapseNode({expandedNodes})
    }


    handleChangeOccured(value) {
        this.store.dispatch( changeContent( value ) );
    }

    componentWillUnmount() {
    }

    render() {
        const { config, customComponents, pageStyles } = this.props;
        const { treeCollapseExpandedState } = this.state

        let { onStartEditPageBody } = config;

        return <Provider store={this.store}>
            <ProductEditContainer
                onStartEditPageBody={onStartEditPageBody}
                customComponents={customComponents}
                pageStyles={pageStyles}
                treeCollapseExpandedState={treeCollapseExpandedState}
            />
        </Provider>
    }
}



export class Evoluttree extends React.Component {
    constructor(props) {
        super(props)

        this.C = class extends React.Component {
            constructor(props) {
                super(props)

                this.state = {props}
            }
            componentWillReceiveProps(nextProps) {

                console.log("evolutree_nextprops", nextProps);


                this.setState({props: nextProps})
            }

            render() {
                const props = this.state.props
                return <App {...props}  />
            }
        }

        if ( props.config.dragDropContextManager === true) {
            this.C = DragDropContext(HTML5Backend)(this.C)
        }



        this.state = {
            props
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({props: nextProps})
    }

    render() {
        const props = this.state.props

        let C = this.C


        return <C {...props}/>
    }
}


Evoluttree.propTypes = {
    /* estado da árvore
            <code>
                {
                    expandedNodes: []
                }
            </code>
     */

    /* TODO: isso ainda vale? */
    treeState: PropTypes.object,

    /* Estado de contração/expansão dos nós da árvore */
    treeCollapseExpandedState: PropTypes.object,

    /* Quando nós da árvore forem expandidos/colapsados */
    onExpandCollapseNode: PropTypes.function,
}



