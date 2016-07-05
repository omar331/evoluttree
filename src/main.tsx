import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, Redirect, IndexRoute, Link } from 'react-router';

import ProductListComponent from './components/product.list.component';
import NewProductComponent from './components/new.product.component';
import ContentsComponent from './components/contents.component';

ReactDOM.render(
    (
        <Router>
            <Route path="/" component={ProductListComponent} />
            <Route path="/new" component={NewProductComponent} />
            <Route path="/contents" component={ContentsComponent} />
        </Router>
    ),
document.getElementById('content'));

//
//ReactDOM.render(<MainComponent />, document.getElementById('content'));