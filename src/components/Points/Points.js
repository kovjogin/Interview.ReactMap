import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value, sortIndex, removePoint}) =>
    <li className='d-flex list-group-item'>{value}
        <a href="javascript:void(0)" className='btn-link text-danger ml-auto'
           onClick={() => { removePoint(sortIndex); }}>Удалить</a>
    </li>
);

const SortableList = SortableContainer(({items, removePoint}) => {
    return (
        <ul className='list-group w-100 mt-2'>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index} value={value}
                    sortIndex={index}
                    removePoint={removePoint}/>
            ))}
        </ul>
    );
});


class Points extends Component {
    constructor(props) {
        super(props);
    };

    shouldCancelStart(e) {
        // Cancel sorting if the event target is an anchor tag (`a`)
        if (e.target.tagName.toLowerCase() === 'a') {
            console.log('a');
            return true; // Return true to cancel sorting
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
       this.props.reorderPoints(arrayMove(this.props.points, oldIndex, newIndex));
    };

    render() {
        if(this.props.points && this.props.points.length > 0) {
            return <SortableList items={this.props.points} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart} removePoint={this.props.removePoint}/>
        } else {
            return <div></div>;
        }
    }
}

export default Points;