import * as React from 'react';
import ProductEdit from './components/product.edit';


export default class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <ProductEdit />
            </div>
        );
    }
}

