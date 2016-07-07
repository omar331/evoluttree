import * as React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import Pages from './elements/pages.component';
import ComponentsBar from './components.bar';

const pages = [
    {
        id: 1,
        title: 'Conteudo 1',
        pages: [
            {id: 11,title: 'Conteúdo 1a'},
            {
                id: 12,
                title: 'Conteúdo 1b',
                pages: [
                    {id: 121,title: 'Conteúdo 1ba'},
                    {
                        id: 122,
                        title: 'Conteúdo 1bb',
                        pages: [
                            {id: 1221,title: 'Conteúdo 1bba'},
                            {id: 1222,title: 'Conteúdo 1bbb'},
                            {id: 1223,title: 'Conteúdo 1bbc'}
                        ]
                    },
                    {id: 123,title: 'Conteúdo 1bc'}
                ]
            },
            {id: 13,title: 'Conteúdo 1c'}
        ]
    },
    {
        id: 2,
        title: 'Conteudo 2',
        pages: [
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


export default class ProductEditComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Grid>
                <Row>
                    <Col sm={12} md={12}>
                        --PRODUTO TITULO ******
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={4}>
                        <ComponentsBar />
                    </Col>
                    <Col sm={12} md={8}>
                        <Pages pages={pages}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

