import * as React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Grid, Row, Col } from 'react-bootstrap';

import './css/contents.css';

import Pages from './elements/pages.component';
import ComponentsBar from './components.bar';

const pages = [
    {
        id: 1,
        title: 'Página 1',
        pages: [
            {id: 11,title: 'Página *** 1a'},
            {
                id: 12,
                title: 'Página 1b',
                pages: [
                    {id: 121,title: 'Página 1ba'},
                    {
                        id: 122,
                        title: 'Página 1bb',
                        pages: [
                            {id: 1221,title: 'Página 1bba'},
                            {id: 1222,title: 'Página 1bbb'},
                            {id: 1223,title: 'Página 1bbc'}
                        ]
                    },
                    {id: 123,title: 'Página 1bc'}
                ]
            },
            {id: 13,title: 'Página 1c'}
        ]
    },
    {
        id: 2,
        title: 'Página 2',
        pages: [
            {id: 21,title: 'Página 2a'},
            {id: 22,title: 'Página 2b'},
            {id: 23,title: 'Página 2c'}
        ]
    },
    {
        id: 3,
        title: 'Página 3'
    }
];


class ProductEditComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="product-editing">
                <Grid>
                    <Row>
                        <Col sm={12} md={12}>
                            --PRODUTO TITULO ******
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={2}>
                            <ComponentsBar />
                        </Col>
                        <Col sm={12} md={6}>
                            <Pages pages={pages}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(ProductEditComponent);

