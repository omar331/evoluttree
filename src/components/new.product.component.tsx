import * as React from 'react';

export default class NewProductComponent extends React.Component<{ children: any }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <div>
        ** NOVO PRODUTO ** <br/>
        </div>);
    }
}



