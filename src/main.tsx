import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './app.component';

import rootReducer from './reducer';

const initialState = {
    editing: {
        productId: 123,
        title: 'Novo produto',
        pages: [
            {
                id: 1,
                title: 'Página 1',
                pages: [
                    {id: 11, title: 'Página 1a'},
                    {
                        id: 12,
                        title: 'Página 1b',
                        pages: [
                            {id: 121, title: 'Página 1ba'},
                            {
                                id: 122,
                                title: 'Página 1bb',
                                pages: [
                                    {id: 1221, title: 'Página 1bba'},
                                    {id: 1222, title: 'Página 1bbb'},
                                    {id: 1223, title: 'Página 1bbc'}
                                ]
                            },
                            {id: 123, title: 'Página 1bc'}
                        ]
                    },
                    {id: 13, title: 'Página 1c'}
                ]
            },
            {
                id: 2,
                title: 'Página 2',
                pages: [
                    {id: 21, title: 'Página 2a'},
                    {id: 22, title: 'Página 2b'},
                    {id: 23, title: 'Página 2c'}
                ]
            },
            {
                id: 3,
                title: 'Página 3'
            }
        ]
    }
};


const store = createStore(rootReducer, initialState);

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
document.getElementById('content'));

