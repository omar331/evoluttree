import * as React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { fromJS } from 'immutable';

import ProductEdit from './components/product.edit'

import { Provider } from 'react-redux'

import { createStore, applyMiddleware,compose } from 'redux'

import { replaceState } from "./actions/products"

import productReducer from './reducers/product'

import * as productHelper from './helper/productHelper'
import * as externalHooksConnect from './helper/externalHooksConnect'
import { mapActionToAPIParameters } from './helper/mapToExternalHooks'

import * as sampleSettings from './misc/sampleSettings.tsx'

import * as clientApi from './client-api.tsx'

let store = createStore(
    productReducer,
    {},
    applyMiddleware(mapActionToAPIParameters, externalHooksConnect.connect)
)

// Expose client API externally
clientApi.expose(store)


interface AppProps {
    config?: any,
    editingProduct?: any
}


/**
 * Main Evoluttree component
 * (actually it'll be wrapped by dnd's DragDropContext)
 *
 */
export class App extends React.Component<AppProps, {}> {
    store: any;

    public static defaultProps: AppProps = {
        config: {},
        editingProduct: null
    }

    constructor(props:AppProps) {
        super(props);

        let editingProduct = props.editingProduct

        // ---> if no editing information are provided, get the sample
        if ( editingProduct == null ) editingProduct = sampleSettings.editingProduct

        // ensure every editing product has a local id
        editingProduct = productHelper.prepareEditingProduct(editingProduct)

        // populates initial state with editing product
        const initialState = fromJS({
            editing: editingProduct
        })

        store.dispatch( replaceState(initialState) )
    }
    render() {
        const { config } = this.props
        let { onStartEditPageBody } = config

        return(
            <Provider store={store}>
                <ProductEdit
                    onStartEditPageBody={onStartEditPageBody}
                
                />
            </Provider>
        );
    }
}


/**
 *
 * @type {ContextComponentClass<{config?: any}>}
 */
export const Evoluttree =  DragDropContext<{config?: any, editingProduct?: any}>(HTML5Backend)(
    React.createClass({
        render: function () {
            return <App {...this.props} />;
        },
    })
);
