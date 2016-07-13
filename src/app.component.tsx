import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ProductEdit from './components/product.edit';


const produto = {
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
                        title: 'Página 1b'
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


class App extends React.Component<{productInfo: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <ProductEdit productInfo={produto} />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);

