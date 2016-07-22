import * as React from 'react';

import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

import DropStuffArea from './drop-stuff-area';

import { TitleEdit } from '../misc/title-edit'


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
 *
 * Each page has a DropStuffArea where it's possible do add/assign
 * new contents to the page. Those contents could be pages, tasks,
 * notes and so on
 *
 */
class PageItem extends React.Component<{connectDragSource: any, isDragging: any, onTitleChange: any, info: any}, {editingTitle: boolean}> {
    constructor(props) {
        super(props);

        this.state = {
            editingTitle: false
        }
    }
    toggleEditingTitle() {
        const { info, onTitleChange } = this.props;

        let currentStateEditing = this.state.editingTitle;
        let newStateEditing = !currentStateEditing

        if ( newStateEditing ) {
        }

        this.setState({editingTitle: newStateEditing})
    }
    updateTitle(e) {
        const { info, onTitleChange } = this.props;
        onTitleChange(info.get('localId'), e.target.value )

        this.toggleEditingTitle()
    }
    handleDropItem(item) {
        const { info } = this.props

        console.log('drop drop drop')
    }
    render() {
        const { info, connectDragSource, isDragging, onTitleChange } = this.props;

        // does this node have children nodes?
        let children = null;
        let pages;

        if ( pages = info.get('pages') ) {
            children = <Pages pages={pages} onTitleChange={onTitleChange}/>;
        }

        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
              }}>
                <li className="page-item-holder">
                    <div className="page-item">
                        <div className="page-title" onClick={ (e) => { this.toggleEditingTitle() } }>
                            { this.state.editingTitle ?
                                <TitleEdit value={ info.get('title') }
                                           onTitleChange={ this.updateTitle.bind(this) }
                                />
                                     :
                                info.get('title')
                            }
                        </div>
                    </div>
                    <DropStuffArea onDrop={this.handleDropItem}/>
                    {children}
                </li>
            </div>
        );
    }
}
export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem);









