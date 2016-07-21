import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Pages from './pages.component';

import { DragSource } from 'react-dnd';

import { ItemTypes } from '../constants';

import InsertStuffArea from './insert-stuff-area';

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
 */
class PageItem extends React.Component<{connectDragSource: any, isDragging: any, onTitleChange: any, info: any}, {editingTitle: boolean}> {
    refs: {
        [string: string]: any;
        titleEdit:any;
    }
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
                                <TitleEdit ref="titleEdit"
                                           value={ info.get('title') }
                                           onTitleChange={ this.updateTitle.bind(this) }
                                />
                                     :
                                info.get('title')
                            }
                        </div>
                    </div>
                    <InsertStuffArea />
                    {children}
                </li>
            </div>
        );
    }
}
export default DragSource(ItemTypes.MOVE_PAGE, pageListingSource, collect)(PageItem);





class TitleEdit extends React.Component<{value: string, onTitleChange: any}, {}> {
    refs: {
        [string: string]: any;
        textInput:any;
    }
    componentDidMount() {
        this.refs.textInput.focus();
    }
    render() {
        const { value, onTitleChange } = this.props

        return <input type="text"
                ref="textInput"                      
               style={ {width: "100%"} }
               defaultValue={ value }
               onBlur={ onTitleChange }
               onClick={ (e) => { e.stopPropagation() } }
        />
    }
}




