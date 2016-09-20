import * as React from 'react';

import * as classNames from 'classnames';

import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../constants';


const dropStuffAreaTarget = {
    canDrop(props:any) {
        // TODO: check what type of object may be dropped here
        return true;
    },
    drop(props:any, monitor:any) {
        let item = monitor.getItem()

        switch (monitor.getItemType()) {
            case ItemTypes.NEW_PAGE:
                props.onDrop(ItemTypes.NEW_PAGE, 
                                {
                                    ownerPage: props.ownerPage,
                                    pageOrder: props.pageOrder,
                                    parentPage: props.parentPage
                                }
                            )
                break
            case ItemTypes.MOVE_PAGE:
                let destinationId:string = null

                destinationId = props.ownerPage.get('localId')

                props.onDrop(ItemTypes.MOVE_PAGE,
                                {
                                    sourceLocalId: item.localId,
                                    destinationPageLocalId: destinationId,
                                    position: props.pageOrder + 1
                                }
                            )
                break
        }
    }
};


const collect = (connect:any, monitor:any) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
};




interface DropAreaProps {
    ownerPage?: any,
    parentPage?: any,
    previousPage?: any,
    pageOrder?: number,
    connectDropTarget: any,
    isOver: any,
    onDragOverBegin?: any,
    onDragOverEnd?: any,
    canDrop: any,
    onDrop: any,
    onNewPage?: any,
    pageItemBeingDragged?: any
}




/**
 * Area where users can place content stuff (pages, tasks and so on)
 */
class DropArea extends React.Component<DropAreaProps, {isDraggingOver?: boolean}> {
    constructor(props:any) {
        super(props)

        this.state = {
            isDraggingOver: false
        }
    }

    handleDragOver() {
        const {ownerPage, onDragOverBegin, onDragOverEnd, isOver } = this.props;
        const { isDraggingOver } = this.state

        // enters
        if (isDraggingOver && isOver ) {
            onDragOverBegin && onDragOverBegin( ownerPage )
            this.setState({isDraggingOver:true})
        }

        // leave
        if (!isOver ) {
            onDragOverEnd && onDragOverEnd( ownerPage )
            this.setState({isDraggingOver:false})
        }
    }


    componentWillReceiveProps() {
        // verify dragging over
//        this.handleDragOver()
    }

    render() {
        const { connectDropTarget, isOver, pageItemBeingDragged } = this.props;


        // this.handleDragOver()

        // const { isDraggingOver } = this.state
        return connectDropTarget(
            <div className={classNames( {'insert-stuff-area': true, 'insert-stuff-area-over': isOver } )}>
            </div>
        );
    }
}

export const DropStuffArea = DropTarget( [ItemTypes.MOVE_PAGE, ItemTypes.NEW_PAGE, ItemTypes.NEW_TASK] , dropStuffAreaTarget, collect)(DropArea)

