import * as React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { fromJS } from 'immutable';

import ProductEditContainer from './containers/product-edit'

import { Provider } from 'react-redux'

import { createStore, applyMiddleware,compose } from 'redux'

import { replaceState, pageJustChangedSanitize } from "./actions/products"

import productReducer from './reducers/product'

import * as productHelper from './helper/productHelper'
import * as externalHooksConnect from './helper/externalHooksConnect'
import { mapActionToAPIParameters } from './helper/mapToExternalHooks'

import * as sampleSettings from './misc/sampleSettings.tsx'

import * as clientApi from './client-api.tsx'

import { AppProps } from './components/model/AppProps'


//noinspection TypeScriptValidateTypes
export class App extends React.Component<AppProps, {}> {
    store: any;

    public static defaultProps: AppProps = {
        config: {
            hookActionsToExternal: null,
            onStartEditPageBody: null,
            onContentChange: null
        },
        editingProduct: null,
        customComponents: {}
    }

    constructor(props:AppProps) {
        super(props);

        //noinspection TypeScriptUnresolvedVariable
        const { config } = this.props

        let editingProduct:any = props.editingProduct
        let hookActionsToExternal:any = null


        // ---> hook frontend actions to a external function?
        if ( config.hasOwnProperty('hookActionsToExternal') ) {
            hookActionsToExternal = config.hookActionsToExternal
        }

        // ---> if no editing information are provided, get the sample
        if ( editingProduct == null ) editingProduct = sampleSettings.editingProduct

        // ensure every editing product has a local id
        editingProduct = productHelper.prepareEditingProduct(editingProduct)
        editingProduct.misc = {
            pageItemBeingDragged: null,

            // pages just changed
            pagesJustChanged: fromJS([])
        }

        // populates initial state with editing product
        const initialState:any = fromJS({
            editing: editingProduct
        })


        this.store = createStore(
            productReducer,
            {},
            applyMiddleware(mapActionToAPIParameters, externalHooksConnect.connect( {hookActionsToExternal} ))
        )

        // Expose client API 
        clientApi.expose(this.store)


        /**
         * Subscribe for content changes
         */
        if ( config.onContentChange ) {
            let store = this.store

            store.subscribe( () => {
                let productState = store.getState().get('editing').toJS()
                config.onContentChange(productState)
            })
        }


        this.store.dispatch( replaceState(initialState) )

        // just changed sanitize
        window.setInterval( () => {
            this.store.dispatch( pageJustChangedSanitize() )
        }, 5000 )
    }
    render() {
        //noinspection TypeScriptUnresolvedVariable
        const { config, customComponents } = this.props
        let { onStartEditPageBody } = config

        return(
            <Provider store={this.store}>
                <ProductEditContainer
                    onStartEditPageBody={onStartEditPageBody}
                    customComponents={customComponents}
                />
            </Provider>
        );
    }
}


/**
 *
 * @type {ContextComponentClass<{config?: any}>}
 */
export const Evoluttree =  DragDropContext<{config?: any, editingProduct?: any, customComponents?: any}>(HTML5Backend)(
    React.createClass({
        render: function () {
            return <App {...this.props} />;
        },
    })
)

