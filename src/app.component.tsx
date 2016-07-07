import * as React from 'react';

import ProductEditComponent from './components/product.edit.component';



export default class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <ProductEditComponent />
            </div>
        );
    }
}

