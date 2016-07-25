import * as React from 'react';

import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

import { DropStuffArea } from './drop-stuff-area';

import { TitleEdit } from '../misc/title-edit'


const pageListingSource = {
    beginDrag(props) {
        return {
            localId: props.localId,
            id: props.id
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
    onNewPage: any,
    info: any,
    collapsed?: boolean,
    parentPage: any,
    pageOrder?: number
}

class PageItem extends React.Component<PageItemProps, {editingTitle?: boolean, collapsed?: boolean}> {
    public static defaultProps: PageItemProps = {
        connectDragSource: null,
        isDragging: false,
        onTitleChange: null,
        onNewPage: null,
        info: {},
        collapsed: true,
        parentPage: null
    }

    constructor(props) {
        super(props);

        const { collapsed } = this.props
        
        this.state = {
            editingTitle: false,
            collapsed: collapsed
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

    /**
     * Handles a content drop in DropStuffArea
     * @param itemType
     * @param item
     */
    handleDropItem(itemType, info) {
        const { onNewPage } = this.props
        
        switch (itemType) {
            case ItemTypes.NEW_PAGE:
                onNewPage(info.ownerPage, info.parentPage, info.pageOrder )
                break
        }
    }
    handleExpandCollapse(e) {
        this.setState({collapsed: (!this.state.collapsed) })
    }
    render() {
        const { info, connectDragSource, isDragging, onTitleChange,
                 onNewPage, parentPage, pageOrder } = this.props;

        // does this node have children nodes?
        let children = null, hasChildren = false;
        let pages = info.get('pages')

        hasChildren = pages != null

        if ( (!this.state.collapsed) && (hasChildren) ) {
            children = <Pages pages={pages}
                              onTitleChange={onTitleChange}
                              onNewPage={onNewPage}
                              parentPage={info}
                        />;
        }


        return connectDragSource(
            <li className="page-item-holder" style={{ opacity: isDragging ? 0.5 : 1 }}>
                <div className="page-item">
                  <div style={{width: '3%', float: 'left'}} onClick={this.handleExpandCollapse.bind(this)}>
                      {  hasChildren ? (
                              this.state.collapsed ?
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
                              info.get('title')
                          }
                      </div>
                  </div>
                </div>
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









