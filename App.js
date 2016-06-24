import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                    <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});

class SortableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }
        this.onSortEnd = this.onSortEnd.bind(this);
    }
    onSortEnd({oldIndex, newIndex}){
        console.log(' oldIndex =%o    newIndex=%o', oldIndex, newIndex );
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };
    render() {
        return (
            <div>
                <h2>ISO9001 - V6</h2>

                <p>Arraste para organizar...</p>
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />

                <hr />

                <p>Evolutto</p>
            </div>
        )
    }
}

export default SortableComponent;