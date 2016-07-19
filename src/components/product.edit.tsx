import * as React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

import './css/contents.css';

import GeneralInfoContainer from '../containers/general-info';
import PagesListContainer from '../containers/pages-list';

import ComponentsBar from './components.bar';

export default class ProductEditComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);

        this.state =
            {
            }
    }
    render() {
        return(
            <div className="product-editing">
                <Grid>  
                    <Row>
                        <Col md={12}>
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
