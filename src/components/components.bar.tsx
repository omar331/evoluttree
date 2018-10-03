import * as React from 'react';
import { Label, Button, Glyphicon } from 'react-bootstrap';

import { DragSource } from 'react-dnd';

import { ItemTypes } from './constants';

const newElementSource = {
    beginDrag(props:any) {
        return {};
    }
};

function collect(connect:any, monitor:any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}



/**
 * Represents a new page
 */
class NewPageElement extends React.Component<{connectDragSource: any, isDragging: any}, {}> {
    constructor(props:any) {
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
                <Label bsStyle="primary"> página</Label>
            </div>
        );
    }
}
const DraggableNewPageElement = DragSource(ItemTypes.NEW_PAGE, newElementSource, collect)(NewPageElement);



/**
 * Represents a new task
 */
class NewTaskElement extends React.Component<{connectDragSource: any, isDragging: any}, {}> {
    constructor(props:any) {
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
    constructor(props:any) {
        super(props);
    }
    render() {
        const { onNewPage } = this.props;

        return(
            <div className="components-list">
                <div className="component">
                    { typeof this.props.pages == 'undefined'
                        ? <Button bsStyle="success" onClick={ () => onNewPage(null, 0) }>+</Button>
                        : ''
                    }


                    {/*<DraggableNewPageElement />*/}
                </div>
                {/*
                <div className="component">
                    <DraggableNewTaskElement />
                </div>
                */}
            </div>
        );
    }
}