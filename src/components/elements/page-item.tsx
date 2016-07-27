import * as React from 'react';

import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

import { DropStuffArea } from './drop-stuff-area';

import { TitleEdit } from '../misc/title-edit'
import { TitleDisplay } from '../misc/title-display'


const pageListingSource = {
    beginDrag(props) {
        return {
            localId: props.info.get('localId'),
            id: props.info.get('id'),
            pageOrder: props.info.get('pageOrder')
        };
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
interface PageItemProps {
    connectDragSource: any,
    isDragging: any,
    onTitleChange: any,
    onNewPage?: any,
    onMovePage?:any,
    onChangeTreeState: any,
    info: any,
    parentPage: any,
    pageOrder?: number
}

class PageItem extends React.Component<PageItemProps, {editingTitle?: boolean, collapsed?: boolean}> {
    public static defaultProps: PageItemProps = {
        connectDragSource: null,
        isDragging: false,
        onTitleChange: null,
        onNewPage: null,
        onMovePage: null,
        onChangeTreeState: null,
        info: {},
        parentPage: null
    }

    constructor(props) {
        super(props);

        this.state = {
            editingTitle: false
        }
    }
    toggleEditingTitle() {
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

    /**
     * Handles a content drop in DropStuffArea
     * @param itemType
     * @param item
     */
    handleDropItem(itemType, info) {
        const { onNewPage, onMovePage } = this.props

        switch (itemType) {
            case ItemTypes.NEW_PAGE:
                onNewPage(info.ownerPage.get('localId'), info.pageOrder + 1 )
                break
            case ItemTypes.MOVE_PAGE:
                onMovePage( info.sourceLocalId, info.destinationPageLocalId, info.position )
                break
        }
    }
    handleExpandCollapse(e) {
        const { onChangeTreeState, info } = this.props

        const newCollapsedState = !this.state.collapsed
        
        onChangeTreeState( info.get('localId'), {collapsed: newCollapsedState})        
        
        this.setState({collapsed: newCollapsedState })
    }
    render() {
        const { info, connectDragSource, isDragging, onTitleChange,
                 onNewPage, onMovePage, parentPage, pageOrder,
                onChangeTreeState } = this.props;

        // does this node have children nodes?
        let children = null;
        let pages:any = info.get('pages');

        let hasChildren:boolean = (pages != null)

        const collapsed = info.get('collapsed') || false

        if ( (!collapsed) && (hasChildren) ) {
            children = <Pages pages={pages}
                              onTitleChange={onTitleChange}
                              onNewPage={onNewPage}
                              onMovePage={onMovePage}
                              parentPage={info}
                              onChangeTreeState={onChangeTreeState}
                        />;
        }

        return connectDragSource(
            <li className="page-item-holder" style={{ opacity: isDragging ? 0.5 : 1 }}>
                <div className="page-item">
                  <div style={{width: '3%', float: 'left'}} onClick={this.handleExpandCollapse.bind(this)}>
                      {  hasChildren ? (
                              collapsed ?
                              '+' :
                              '-'
                          ) : <span style={{opacity:0}}>*</span>
                      }
                  </div>
                  <div style={{width: '80%'}}>
                      <div className="page-title" onClick={ (e) => { this.toggleEditingTitle() } }>
                          { this.state.editingTitle ?
                              <TitleEdit value={ info.get('title') }
                                         onTitleChange={ this.updateTitle.bind(this) }
                              />
                              :
                              <TitleDisplay value={ info.get('title') } />
                          }
                      </div>
                  </div>
                </div>

                {/* This is the place where users can insert new pages, tasks and so on */}
                <DropStuffArea
                            ownerPage={ info }
                            parentPage={ parentPage }
                            onDrop={this.handleDropItem.bind(this)}
                            pageOrder={pageOrder}
                />
                {children}
            </li>
        );
    }
}
export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem);









