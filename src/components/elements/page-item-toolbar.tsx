import * as React from 'react';
import { Glyphicon } from 'react-bootstrap'

interface PageItemToolbarProps {
    pageInfo: any,
    onDelete?: any
}



export default class PageItemToolbar extends React.Component<PageItemToolbarProps, {}> {
    constructor(props) {
        super(props);
    }

   render() {
        const { onDelete, pageInfo } = this.props

        return <div>
                    <a onClick={ () => { onDelete( pageInfo.get('localId') ) } }>
                        <Glyphicon glyph="trash" />
                    </a>
               </div>
    }
}


