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

const initialState = fromJS({
    editing: {
        localId: v4(),
        general: {
            localId: v4(),
            id: 123,
            title: 'Novo produto'
        },
        pages: [
            {
                id: 1,
                localId: v4(),
                title: 'Página 1',
                pages: [
                    {id: 11, localId: v4(), title: 'Página 1a'},
                    {
                        id: 12, localId: v4(),
                        title: 'Página 1b'
                    },
                    {id: 13, localId: v4(), title: 'Página 1c'}
                ]
            },
            {
                id: 2, localId: v4(),
                title: 'Página 2',
                pages: [
                    {id: 21, localId: v4(), title: 'Página 2a'},
                    {
                        id: 22,
                        localId: v4(),
                        title: 'Página 2b Yeah!',
                        body: 'Lorem Ipsum Yeah, mother fucker!',
                        pages: [
                            {id: 11, localId: v4(), title: 'Página 2aa'},
                            {
                                id: 12, localId: v4(),
                                title: 'Página 2ab'
                            },
                            {id: 13, localId: v4(), title: 'Página 2ac'}
                        ],
                        collapsed: true
                    },
                    {id: 23, localId: v4(), title: 'Página 2c'}
                ]
            },
            {
                id: 3, localId: v4(),
                title: 'Página 3'
            }
        ]
    }
});

let store = createStore(productReducer, initialState)

interface AppProps {
    config?: any,
    editingProduct?: any
}

export class App extends React.Component<AppProps, {}> {
    public static defaultProps: AppProps = {
        config: {},
        editingProduct: null
    }

    constructor(props:AppProps) {
        super(props);

        const editingProduct = productHelper.prepareEditingProduct(props.editingProduct)

        console.log("-> config = %o    editing or = %o   editing imm = %o", props.config, props.editingProduct, editingProduct.toJS()  )
    }

    render() {
        return(
            <Provider store={store}>
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
