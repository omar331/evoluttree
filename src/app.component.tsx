import * as React from 'react';

import ProductListComponent from './components/product.list.component';
import NewProductComponent from './components/new.product.component';
import ContentsListComponent from './components/contents.list.component';


const contents = [
    {
        id: 1,
        title: 'Conteudo 1',
        contents: [
            {id: 11,title: 'Conteúdo 1a'},
            {
                id: 12,
                title: 'Conteúdo 1b',
                contents: [
                    {id: 121,title: 'Conteúdo 1ba'},
                    {id: 122,title: 'Conteúdo 1bb'},
                    {id: 123,title: 'Conteúdo 1bc'}
                ]
            },
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
];


export default class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h3>Produto *_*  - Conteúdos</h3>
                <ContentsListComponent contents={contents}/>
            </div>
        );
    }
}

