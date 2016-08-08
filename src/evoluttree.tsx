import * as React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { v4 } from 'node-uuid';

import { fromJS } from 'immutable';

import ProductEdit from './components/product.edit'

import { Provider } from 'react-redux'

import { createStore } from 'redux'
import productReducer from './reducers/product'

import * as productHelper from './helper/productHelper'

import * as sampleSettings from './misc/sampleSettings.tsx'

interface AppProps {
    config?: any,
    editingProduct?: any
}


/**
 * Root react component for evoluttree.
 *
 *
 *
 *
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

        this.store = createStore(productReducer, initialState)
    }

    render() {
        return(
            <Provider store={this.store}>
                <ProductEdit />
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
        }
    })
);
