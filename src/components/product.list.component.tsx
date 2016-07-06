import * as React from 'react';

export default class ProductListComponent extends React.Component<{ children: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <div>
        ** LISTA DE PRODUTOS 1 ** <br/>
        ** LISTA DE PRODUTOS 2 ** <br/>
        ** LISTA DE PRODUTOS 3 ** <br/>
        </div>);
    }
}



