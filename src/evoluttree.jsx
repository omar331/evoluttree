import * as React from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { fromJS } from 'immutable';

import ProductEditContainer from './containers/product-edit';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import { replaceState, pageJustChangedSanitize, changeContent } from './actions/products';

import productReducer from './reducers/product';

import * as productHelper from './helper/productHelper';
import * as externalHooksConnect from './helper/externalHooksConnect';
import { mapActionToAPIParameters } from './helper/mapToExternalHooks';

import * as sampleSettings from './misc/sampleSettings.tsx';

import * as clientApi from './client-api.tsx';

import { AppProps } from './components/model/AppProps';

class App extends React.Component {

    public static defaultProps = {
       config: {
            hookActionsToExternal: undefined,
            onStartEditPageBody: undefined,
            onContentChange: undefined,
            dragDropContextManager: true
        },
        editingProduct: undefined,
        customComponents: {}
    };

    constructor(props) {
        super(props);

        //noinspection TypeScriptUnresolvedVariable
        const { config } = this.props;

        let editingProduct = props.editingProduct;

        let hookActionsToExternal = undefined;

        // ---> hook frontend actions to a external function?
        if ( config.hasOwnProperty('hookActionsToExternal') ) {
            hookActionsToExternal = config.hookActionsToExternal;
        }

        // ---> if no editing information are provided, get the sample
        if ( editingProduct == undefined ) editingProduct = sampleSettings.editingProduct;

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

        this.store = createStore(
            productReducer,
            {},
            applyMiddleware(mapActionToAPIParameters, externalHooksConnect.connect( {hookActionsToExternal} ))
        );

        // Expose client API 
        clientApi.expose(this.store);

        this.store.dispatch( replaceState(initialState) );

        // just changed sanitize
        window.setInterval( () => {
            this.store.dispatch( pageJustChangedSanitize() );
        }, 5000 );
    }

    componentDidMount() {
        //noinspection TypeScriptUnresolvedVariable
        const { config } = this.props;

        var that = this;
        /**
         * Subscribe for content changes
         */
        if ( config.onContentChange ) {

            let store = this.store;

            this.unsubscribe = store.subscribe( () => {
                if(store.getState().get('contentChanged')) {
                    let productState = store.getState().get('editing').toJS();
                    config.onContentChange(productState);
                    this.handleChangeOccured(false);
                }
            });
        }
        that.forceUpdate();
    }

    handleChangeOccured(value) {
        this.store.dispatch( changeContent( value ) );
    }

    componentWillUnmount() {
        if (this.unsubscribe) { // don't forget to unsubscribe when unmounting

            this.unsubscribe();
            this.unsubscribe = undefined;
        }
    }

    render() {

        //noinspection TypeScriptUnresolvedVariable
        const { config, customComponents } = this.props;
        let { onStartEditPageBody } = config;

        return <Provider store={this.store}>
            <ProductEditContainer
                onStartEditPageBody={onStartEditPageBody}
                customComponents={customComponents}
            />
        </Provider>
    }
}



export class Evoluttree extends React.Component {


    render() {
        const props = this.props


        let C = class extends React.Component {
            render() {
                return <App {...props}  />
            }
        }


        if ( props.config.dragDropContextManager === true) {
            C = DragDropContext(HTML5Backend)(C)
        }


        return <C />
    }
}