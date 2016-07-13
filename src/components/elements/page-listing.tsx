import * as React from 'react';
import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

import InsertStuffArea from './insert-stuff-area';


const pageListingSource = {
    beginDrag(props) {
        console.log(' comecou arrastar PAGINA DO CONTEUDO %d', props.id );
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
class PageListing extends React.Component<{connectDragSource: any, isDragging: any, pageInfo: any}, {pageInfo: any}> {
    constructor(props) {
        super(props);

        this.state = {
            pageInfo: props.pageInfo
        };
    }
    render() {
        const { connectDragSource, isDragging } = this.props;
        const { pageInfo } = this.state;

        // does this node have children nodes?
        let children = null;
        if ( pageInfo.hasOwnProperty('pages') ) {
            children = <Pages pages={pageInfo.pages}/>;
        }

        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
              }}>
                <li className="page-item-holder">
                    <div className="page-item">
                        <div className="page-title">
                            { pageInfo.title }
                        </div>
                    </div>
                    <InsertStuffArea ownerPage={pageInfo}/>
                    { children }
                </li>
            </div>
        );
    }
}

export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageListing);

