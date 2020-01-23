import * as React from 'react';
import { Label, Button, Glyphicon } from 'react-bootstrap';

import { DragSource } from 'react-dnd';

import { ItemTypes } from './constants';

import i18n from '../../translations/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus as addPagina, faExclamationCircle as noPages} from '@fortawesome/free-solid-svg-icons'


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
                <Label bsStyle="primary"> {i18n.t('pagina')}</Label>
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
export default class ComponentsBar extends React.Component<{ onNewPage?: any, productId?: any, pages?: any }, {}> {
    constructor(props:any) {
        super(props);
    }
    render() {
        const { onNewPage, productId } = this.props;

        return(
            <div className='components-list'>
                <div className="component">

                    { typeof this.props.pages === 'undefined' || this.props.pages.size == 0
                        ? <div id={"no-pages"}>
                            <p>
                                <FontAwesomeIcon icon={noPages}/>
                                {i18n.t('seu_produto_nao_possui_nenhuma_pagina_')}
                            </p>
                        </div>
                        : ''
                    }
                    {/*<DraggableNewPageElement />*/}
                </div>

                <div id={'new-page'}>
                    <Button id={'btn-newpage'} bsStyle='success' className={'btn-sm bold light-border'} onClick={ () => onNewPage(null, 0, productId) }>
                        <FontAwesomeIcon icon={addPagina} /> {i18n.t('adicionar_pagina')}
                    </Button>
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