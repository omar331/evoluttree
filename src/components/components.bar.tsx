import * as React from 'react';

import { Button } from 'react-bootstrap';

export default class ComponentBarComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="component-bar">
                <div className="component">
                    <Button bsStyle="info">página/conteúdo</Button>
                </div>
                <div className="component">
                    <Button bsStyle="info">tarefa</Button>
                </div>
            </div>
        );
    }
}



