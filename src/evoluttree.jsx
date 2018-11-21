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

import onChangeMiddleWare from './middlewares/content-change-middleware'
import onExpandCollapseCallback from './middlewares/expand-collapse-nodes-middleware'

// import * as clientApi from './client-api.tsx';
// import _ from 'lodash'

import './components/css/main.scss'
import './components/css/general.css'

class App extends React.Component {

    constructor(props) {
        super(props);

        console.log( ' Evoluttreeroot   constructor ' )

        //noinspection TypeScriptUnresolvedVariable
        const { config, onChange } = this.props;

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

    }


    /**
     * Quando ocorre uma atualização no estado de contração/expansão da árvore
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

        let { onStartEditPageBody } = config;

        return <Provider store={this.store}>
            <ProductEditContainer
                onStartEditPageBody={onStartEditPageBody}
                customComponents={customComponents}
                pageStyles={pageStyles}
            />
        </Provider>
    }
}



export class Evoluttree extends React.Component {
    constructor(props) {
        super(props)

        this.C = class extends React.Component {
            render() {
                const props = this.props
                console.log("   c render props = %o", this.props)


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

}



