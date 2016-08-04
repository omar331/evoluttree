import * as React from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap'

interface PageItemToolbarProps {
    pageInfo: any,
    onDelete?: any,
    onEditClicked: any
}

export default class PageItemToolbar extends React.Component<PageItemToolbarProps, {}> {
    constructor(props) {
        super(props);
    }

   render() {
        const { pageInfo, onEditClicked, onDelete } = this.props

        return <div>
                    <a>
                        <Glyphicon glyph="edit" onClick={ () => { onEditClicked() } } />
                    </a>
                    &nbsp;&nbsp;&nbsp;
                    <a onClick={ () => { onDelete( pageInfo.get('localId') ) } }>
                        <Glyphicon glyph="trash" />
                    </a>
               </div>
    }
}


