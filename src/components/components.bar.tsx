import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { DragSource } from 'react-dnd';

import { ItemTypes } from './constants';

const newElementSource = {
    beginDrag(props) {
        console.log(' comecou arrastar ');
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
 * Represents a new page
 */
class NewPageElement extends React.Component<{connectDragSource: any, isDragging: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
                <Button bsStyle="info"><Glyphicon glyph="plus" /> página</Button>
            </div>
        );
    }
}
const DraggableNewPageElement = DragSource(ItemTypes.NEW_PAGE, newElementSource, collect)(NewPageElement);



/**
 * Represents a new task
 */
class NewTaskElement extends React.Component<{connectDragSource: any, isDragging: any}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
                <Button bsStyle="info"><Glyphicon glyph="plus" /> tarefa</Button>
            </div>
        );
    }
}
const DraggableNewTaskElement = DragSource(ItemTypes.NEW_TASK, newElementSource, collect)(NewTaskElement);


/**
 * Elements (content components) bar
 */
export default class ComponentsBar extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="component-bar">
                <div className="component">
                    <DraggableNewPageElement />
                </div>
                <div className="component">
                    <DraggableNewTaskElement />
                </div>
            </div>
        );
    }
}



