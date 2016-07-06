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
        contents: [
            {
                id: 1,
                title: 'Conteudo 1',
                contents: [
                    {id: 11,title: 'Conteúdo 1a'},
                    {id: 12,title: 'Conteúdo 1b'},
                    {id: 13,title: 'Conteúdo 1c'}
                ]
            },
            {
                id: 2,
                title: 'Conteudo 2',
                contents: [
                    {id: 21,title: 'Conteúdo 2a'},
                    {id: 22,title: 'Conteúdo 2b'},
                    {id: 23,title: 'Conteúdo 2c'}
                ]
            },
            {
                id: 3,
                title: 'Conteudo 3'
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

