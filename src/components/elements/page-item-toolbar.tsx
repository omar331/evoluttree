import * as React from 'react';
import { Glyphicon, Label } from 'react-bootstrap'
import { PageItemToolbarProps } from '../model/PageItemToolbarProps'


export default class PageItemToolbar extends React.Component<PageItemToolbarProps, {}> {
    constructor(props) {
        super(props);
    }

   render() {
        const { pageInfo, onEditClicked, onDelete } = this.props

        return <div>
                    <a>
                        <Label bsStyle="primary">
                            <Glyphicon glyph="edit" onClick={ () => { onEditClicked() } } />
                        </Label>
                    </a>
                    &nbsp;
                    <a onClick={ () => { onDelete( pageInfo.get('localId') ) } }>
                        <Label bsStyle="danger">
                            <Glyphicon glyph="trash" />
                        </Label>
                    </a>
               </div>
    }
}


