import * as React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import './css/contents.css';

import Pages from './elements/pages.component';
import ComponentsBar from './components.bar';

export default class ProductEditComponent extends React.Component<{productInfo: any}, {productInfo: any}> {
    constructor(props) {
        super(props);

        this.state =
            {
                productInfo: props.productInfo
            }
        ;
    }
    render() {
        const { productInfo } = this.state;

        const pages = productInfo.editing.pages;

        return(
            <div className="product-editing">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h3>{productInfo.title}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <ComponentsBar />
                        </Col>
                        <Col md={6}>
                            <Pages pages={pages}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
