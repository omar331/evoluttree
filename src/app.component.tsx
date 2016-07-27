import * as React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { v4 } from 'node-uuid';

import { fromJS } from 'immutable';

import ProductEdit from './components/product.edit'

import { Provider } from 'react-redux'

import { createStore } from 'redux'
import productReducer from './reducers/product'


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
                        title: 'Página 2b',
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
console.log(' store = %o', store );


class App extends React.Component<{productInfo: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Provider store={store}>
                <ProductEdit />
            </Provider>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);

