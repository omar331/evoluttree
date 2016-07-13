import * as React from 'react';

import * as classNames from 'classnames';

import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../constants';


const dropStuffAreaTarget = {
    canDrop(props) {
        // TODO: check what type of object may be dropped here
        return true;
    },
    drop(props) {
    }
};


const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

/**
 * Area where users can place content stuff (pages, tasks and so on)
 */
class InsertStuffArea extends React.Component<{ownerPage: any, connectDropTarget: any, isOver: any, canDrop: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { ownerPage, connectDropTarget, isOver, canDrop } = this.props;

        return connectDropTarget(
            <div className={classNames( {'insert-stuff-area': true, 'insert-stuff-area-over': isOver } )}>
            </div>
        );
    }
}



export default DropTarget( [ItemTypes.MOVE_PAGE, ItemTypes.NEW_PAGE, ItemTypes.NEW_TASK] , dropStuffAreaTarget, collect)(InsertStuffArea);

