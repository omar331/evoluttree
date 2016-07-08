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
        title: 'Página 1'
    },
    {
        id: 2,
        title: 'Página 2'
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
                            <h3>PRODUTO TITULO</h3>
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

