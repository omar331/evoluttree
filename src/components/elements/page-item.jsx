import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Glyphicon, Row, Col } from 'react-bootstrap';

import PagesList from './pages-list';
import PageItemToolbar from './page-item-toolbar'

import PageEditor from './page-editor'

import { DragSource, DropTarget } from 'react-dnd';

import { QuickLevelMove, ItemTypes } from '../constants';

import { DropStuffAreaContainer } from '../../containers/drop-stuff-area.jsx';

import { TitleEdit } from '../misc/title-edit'
import { TitleDisplay } from '../misc/title-display'

import SyntheticEvent = __React.SyntheticEvent;


import * as classNames from 'classnames';
import ControlDisplayTitle from './control-display-title';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

//const { DragSource, DropTarget } = DragDropContext;

const pageListingSource = {
    endDrag(props, monitor, component) {
        let offset = monitor.getDifferenceFromInitialOffset()

        props.onEndDrag && props.onEndDrag(props.info)

        if ( offset == null ) return;

        // component.handleEndDrag( { deltaX: offset.x, deltaY: offset.y });
        // if (typeof component.handleEndDrag == 'function')
            console.log('inicio = %o', component);
            component.handleEndDrag( { deltaX: offset.x, deltaY: offset.y } )
    },
    beginDrag(props) {

        props.onBeginDrag && props.onBeginDrag(props.info)

        return {
            localId: props.info.get('localId'),
            id: props.info.get('id'),
            pageOrder: props.info.get('pageOrder'),
            pageTitle: props.info.get('title'),
            pageInfo: props.info
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


// /**
//  * Represents a page item in product content hierarchy
//  *
//  * Each page has a DropStuffArea where it's possible do add/assign
//  * new contents to the page. These contents could be pages, tasks,
//  * notes and so on
//  *
//  */
// interface PageItemProps {
//     connectDragSource: any,
//     connectDropTarget: any,
//     isDragging: any,
//     onTitleChange: any,
//     onNewPage?: any,
//     onMovePage?:any,
//     onChangeTreeState: any,
//     onQuickLevelMove: any,
//     onChangePageInfo: any,
//     onDeletePage: any,
//     onClonePage: any,
//     onStartEditPageBody: any,
//     onFinishEditPageBody: any,
//     onBeginDrag: any,
//     onEndDrag: any,
//     info: any,
//     parentPage: any,
//     previousPage: any,
//     pageOrder?: number,
//     depth?: number,
//     customComponents?: any,
//     pageItemBeingDraggedOverMe?: any,
//     isOver?: boolean,
// }

// interface PageItemState {
//     editingTitle?: boolean,
//     toolbarVisible?: boolean,
//
//     // when the page item must be shown expanded for a short amount of time
//     // (for instance, when another page item is dragged over the this item,
//     //  this item is expanded temporaly)
//     temporalyExpanded?: boolean,
//     justChanged?: boolean
// }


class PageItem extends React.Component {
    public static defaultProps = {
        connectDragSource: null,
        connectDropTarget: null,
        isDragging: false,
        onTitleChange: null,
        onNewPage: null,
        onMovePage: null,
        onChangeTreeState: null,
        onQuickLevelMove: null,
        onChangePageInfo: null,
        onDeletePage: null,
        onClonePage: null,
        onStartEditPageBody: null,
        onFinishEditPageBody: null,
        onBeginDrag: null,
        onEndDrag: null,
        info: {},
        parentPage: null,
        previousPage: null,
        depth: 0,
        customComponents: {},

        pageItemBeingDraggedOverMe: null,
        isOver: false
    }

    constructor(props) {
        super(props);

        this.state = {
            editingTitle: false,
            toolbarVisible: false,
            temporalyExpanded: false,
            justChanged: false
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
     * @param info
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

        const newCollapsedState = ! info.get('collapsed')

        onChangeTreeState( info.get('localId'), {collapsed: newCollapsedState})
    }

    handleEndDrag(dragInfo) {
        const { info, onQuickLevelMove } = this.props

        let quickLevelMoveInfo = this.getQuickLevelMoveInfo(dragInfo.deltaX, dragInfo.deltaY)

        console.log(" ---- QLM info = %o ", quickLevelMoveInfo)

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


    handleMouseEnter(e) {
        this.setState({toolbarVisible: true})

        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    handleMouseLeave(e) {
        this.setState({toolbarVisible: false})

        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    // page body editor TEXTAREA element ID
    bodyEditorElementId() {
        return 'evltr_text_element_container'
    }

    handleShowBodyEditor(e) {
        const { info, onStartEditPageBody, customComponents } = this.props

        let PageEditorComponent = customComponents.PageEditor || PageEditor

        let pageBodyEditor = React.createElement(PageEditorComponent,
            {
                pageInfo: info,
                onClose: this.handleCloseBodyEditor.bind(this),
                onSave: this.handleSavePage.bind(this),
                textEditorElementId: this.bodyEditorElementId(),
                onClearInterval: this.clearInterval.bind(this)
            }
        )

        ReactDOM.render(pageBodyEditor,
            document.getElementById('page-body-editor'),
            () => {
                if ( onStartEditPageBody != null ) {
                    onStartEditPageBody(this.bodyEditorElementId(), info.toJS() )
                }
            }
        )
    }

    handleSavePage(pageLocalId, info, closeBodyEditor = true) {
        const { onChangePageInfo } = this.props

        onChangePageInfo(pageLocalId, info )

        if ( closeBodyEditor ){
            this.closeBodyEditor()
        }
    }

    handleCloseBodyEditor(e) {

        this.closeBodyEditor()
    }

    closeBodyEditor() {
        const { onFinishEditPageBody } = this.props

        onFinishEditPageBody()

        ReactDOM.unmountComponentAtNode(document.getElementById('page-body-editor'));
    }

    clearInterval( intervalId ){

        clearInterval( intervalId )
    }


    render() {
        const { info, connectDragSource,
                connectDropTarget,
                isDragging, onTitleChange,
                onNewPage, onMovePage, parentPage, previousPage,
                pageOrder, onChangeTreeState, onQuickLevelMove,
                onChangePageInfo, onDeletePage, onClonePage,
                onStartEditPageBody, onFinishEditPageBody,
                depth, customComponents,
                onBeginDrag, onEndDrag,
                pageItemBeingDraggedOverMe,
                isOver,
                pageStyles
        } = this.props;

        let { toolbarVisible } = this.state

        // does this node have children nodes?
        let children = null
        let toolbar = null
        let pages = info.get('pages')

        let hasChildren = (pages != null)

        let enableExpand = false //False for never expand item


        /*
             expand item temporarily,
             when a page is being dragged over this item.
             Ignores when it's the page itself
         */
        let isThereAPageBeingDraggedOverMe = false
        if ( (pageItemBeingDraggedOverMe != null) &&
             (pageItemBeingDraggedOverMe.get('localId') != info.get('localId') ) &&
             (enableExpand != false )
        )
        {
            isThereAPageBeingDraggedOverMe = true
        }

        let temporalyExpanded = (isOver) && isThereAPageBeingDraggedOverMe

        const collapsed = (info.get('collapsed') || false) && ( !temporalyExpanded )

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
                                  onChangePageInfo={onChangePageInfo}
                                  onDeletePage={onDeletePage}
                                  onClonePage={onClonePage}
                                  onStartEditPageBody={onStartEditPageBody}
                                  onFinishEditPageBody={onFinishEditPageBody}
                                  onPageItemBeginDrag={onBeginDrag}
                                  onPageItemEndDrag={onEndDrag}
                                  depth={ depth + 1 }
                                  customComponents={customComponents}
                        />;
        }

        // is toolbar visible?
        // if ( toolbarVisible ) {
            let PageItemToolbarComponent = customComponents.PageItemToolbar || PageItemToolbar
            toolbar = React.createElement(PageItemToolbarComponent,
                {
                    pageInfo: info,
                    onDelete: onDeletePage,
                    onEditClicked: this.handleShowBodyEditor.bind(this),
                    depth: depth,
                    onClone: onClonePage,
                    pageOrder: pageOrder,
                    onNewPage: onNewPage
                }
            )
        // }



        let depthLeftMargin = depth * 5 + '%';
        let editingTitleStyle = this.state.editingTitle ? 'editing-title' : '';
        let depthClasses = 'page-item-depth-' + depth;

        console.log("pageStyles: %o", pageStyles)

        let classCurrentPage = (pageStyles && ( pageStyles.pageCurrent.localId ===  info.get('localId')) )
                                        ? pageStyles.pageCurrent.className
                                        : '';

        // page item content
        let pageItemNode = connectDragSource(
                    <div
                                className={classNames(
                                    'page-tree-item-content', 'page-item-custom', depthClasses, {'just-changed': info.get('justChanged') || false }, classCurrentPage
                                    )}
                            >
                            { hasChildren? this.renderCollapseControl(collapsed) : ''}
                            <div className="page-title page-title-custom" onClick={ (e) => { this.toggleEditingTitle() } }>

                                <ControlDisplayTitle
                                    info={info}
                                    onTitleChange={ this.updateTitle.bind(this) }
                                    editingTitle={this.state.editingTitle}
                                />
                            </div>
                        <span className={"btn-options"}
                        >
                            <FontAwesomeIcon icon={faEllipsisH} />

                        </span>

                        { toolbar }

                     </div>)

        let dropEnabled = isOver ? 'enabled' : '';

        let dropAreaEnabled = "";
        if( pageItemBeingDraggedOverMe != null ) {
            dropAreaEnabled = (pageItemBeingDraggedOverMe.get('localId') !== info.get('localId')) ? "drop-enabled" : ""
        }

        // drop stuff after current item
        let dropStuffArea = <div className={"drop-area " + dropEnabled} >
                            <DropStuffAreaContainer
                                ownerPage={ info }
                                parentPage={ parentPage }
                                previousPage={ previousPage }
                                onDrop={this.handleDropItem.bind(this)}
                                pageOrder={pageOrder}
                            />
                        </div>

        // drop stuff before the first item within the level
        let dropStuffAreaPosition0 = null
        if ( pageOrder === 0 ) {
            dropStuffAreaPosition0 = <div className={"drop-area " + dropEnabled}>
                <DropStuffAreaContainer
                    ownerPage={ info }
                    parentPage={ parentPage }
                    previousPage={ null }
                    onDrop={this.handleDropItem.bind(this)}
                    pageOrder={-1}
                style={{border: '1px solid green'}} />
            </div>
        }

        return connectDropTarget(
            <li className={"page-tree-item page-item-holder page-item-holder-custom " + editingTitleStyle + dropAreaEnabled}
                style={{ opacity: isDragging ? 0.5 : 1 }}>

                {dropStuffAreaPosition0}

                {pageItemNode}

                { (collapsed || !hasChildren) ? dropStuffArea  : <div />}

                {children}
            </li>
        )
    }

    renderCollapseControl(collapsed) {

        return <span className="expand-handler" onClick={this.handleExpandCollapse.bind(this)}>
            {
                collapsed ?
                    <Glyphicon className={"expand-icon"} glyph="plus" /> :
                    <Glyphicon className={"expand-icon"} glyph="minus" />
            }
        </span>
    }
}
let pageItemDragSource =  DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem)







const pageItemTarget = {
    canDrop(props) {
        // TODO: check what type of object may be dropped here
        return true;
    },
    drop: function (props, monitor, component) {
        let offset = monitor.getDifferenceFromInitialOffset();

        // console.log('props = %o', props);

        // console.log('DROP   offset = %o   component = %o', offset, component);

        if (offset === null) {
            return;
        }

        component.handleEndDrag({deltaX: offset.x, deltaY: offset.y});
    }
};


const pageItemCollect = (connect, monitor) => {
    let item = monitor.getItem()

    let pageItemBeingDraggedOverMe = null

    if ( item != null ) {
        pageItemBeingDraggedOverMe = item.pageInfo
    }

    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
        pageItemBeingDraggedOverMe
    }
};



export default DropTarget( [ItemTypes.MOVE_PAGE, ItemTypes.NEW_PAGE, ItemTypes.NEW_TASK] , pageItemTarget, pageItemCollect )(pageItemDragSource)











