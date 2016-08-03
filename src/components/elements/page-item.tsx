import * as React from 'react';

import PagesList from './pages-list';

import { DragSource } from 'react-dnd';

import { QuickLevelMove, ItemTypes } from '../constants';

import { DropStuffArea } from './drop-stuff-area';

import { TitleEdit } from '../misc/title-edit'
import { TitleDisplay } from '../misc/title-display'


const pageListingSource = {
    endDrag(props, monitor, component) {
        let offset = monitor.getDifferenceFromInitialOffset()

        if ( offset == null ) return;

        component.handleEndDrag( { deltaX: offset.x, deltaY: offset.y } )
    },
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
    onQuickLevelMove: any,
    info: any,
    parentPage: any,
    previousPage: any,
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
        onQuickLevelMove: null,
        info: {},
        parentPage: null,
        previousPage: null
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
    handleEndDrag(dragInfo) {
        const { info, pageOrder, onQuickLevelMove } = this.props

        let quickLevelMoveInfo = this.getQuickLevelMoveInfo(dragInfo.deltaX, dragInfo.deltaY)

        // Is it a quick level move?
        if ( quickLevelMoveInfo.direction != QuickLevelMove.DIRECTION_NONE ) {
            onQuickLevelMove( quickLevelMoveInfo.direction, info.get('localId') )
        }
    }

    /**
     * Detect and calculate Quick Level Move (QLM) parameters
     * @param deltaX
     * @param deltaY
     * @returns {{direction: string}}
     */
    getQuickLevelMoveInfo(deltaX, deltaY ) {
        let direction = QuickLevelMove.DIRECTION_NONE
        
        let absDeltaX = Math.abs(deltaX)
        let absDeltaY = Math.abs(deltaY)

        // decides if it's a Q.L.M. 
        if ( (absDeltaX > QuickLevelMove.MIN_DELTA_X) && ( absDeltaY < QuickLevelMove.MAX_DELTA_Y ) ) {
            direction = deltaX > 0 ? QuickLevelMove.DIRECTION_DOWN : QuickLevelMove.DIRECTION_UP
        }
        
        return {
            direction
        }   
    }
    render() {
        const { info, connectDragSource, isDragging, onTitleChange,
                 onNewPage, onMovePage, parentPage, previousPage,
                pageOrder, onChangeTreeState, onQuickLevelMove
        } = this.props;

        // does this node have children nodes?
        let children = null;
        let pages:any = info.get('pages');

        let hasChildren:boolean = (pages != null)

        const collapsed = info.get('collapsed') || false

        // If this page has children and its node is not
        // collapsed, render its children components
        //
        if ( (!collapsed) && (hasChildren) ) {
            children = <PagesList pages={pages}
                                  onTitleChange={onTitleChange}
                                  onNewPage={onNewPage}
                                  onMovePage={onMovePage}
                                  parentPage={info}
                                  onChangeTreeState={onChangeTreeState}
                                  onQuickLevelMove={onQuickLevelMove}
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

                <DropStuffArea
                    ownerPage={ info }
                    parentPage={ parentPage }
                    previousPage={ previousPage }
                    onDrop={this.handleDropItem.bind(this)}
                    pageOrder={pageOrder}
                />
                {children}
            </li>
        );
    }
}
export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem);









