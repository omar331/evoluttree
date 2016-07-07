import * as React from 'react';
import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

const newElementSource = {
    beginDrag(props) {
        console.log(' comecou arrastar PAGINA DO CONTEUDO ');
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


/**
 * Represents a page item in product content hierarchy
 */
class PageListing extends React.Component<{connectDragSource: any, isDragging: any, page: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { connectDragSource, isDragging, page } = this.props;

        // does this node have children nodes?
        let children = null;
        if ( page.hasOwnProperty('pages') ) {
            children = <Pages pages={page.pages}/>;
        }

        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
              }}>
                <li className="page-item-holder">
                    <div className="page-item">
                        <div className="page-title">
                            { page.title }
                        </div>
                    </div>
                    { children }
                </li>
            </div>
        );
    }
}

export default DragSource(ItemTypes.MOVE_PAGE, newElementSource, collect)(PageListing);

