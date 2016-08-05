import * as React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import './css/contents.css';

import GeneralInfoContainer from '../containers/general-info';
import PagesListContainer from '../containers/pages-list';

import ComponentsBar from './components.bar';

export default class ProductEditComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="product-editing">
                <div id="product-editor-modal"></div>
                <Grid>
                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={10}>
                            <GeneralInfoContainer />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <ComponentsBar />
                        </Col>
                        <Col md={6}>
                            <PagesListContainer />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
