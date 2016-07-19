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
class PageItem extends React.Component<{connectDragSource: any, isDragging: any, onTitleChange: any, info: any}, {info: any}> {
    constructor(props) {
        super(props);

        this.state = {
            info: props.info
        };
    }
    render() {
        const { connectDragSource, isDragging, onTitleChange } = this.props;
        const { info } = this.state;

        // does this node have children nodes?
        let children = null;
        if ( info.hasOwnProperty('pages') ) {
            children = <Pages pages={info.pages} onTitleChange={onTitleChange} />;
        }

        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
              }}>
                <li className="page-item-holder">
                    <div className="page-item">
                        <div className="page-title" onClick={ (e) => { onTitleChange(info.localId, "pag novissimo titulo") } }>
                            { info.title }
                        </div>
                    </div>
                    <InsertStuffArea />
                    { children }
                </li>
            </div>
        );
    }
}

export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem);

