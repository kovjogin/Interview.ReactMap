import React from 'react';
import ReactDOM from 'react-dom';
import NewPoint from './NewPoint';

it('Render: NewPoint', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewPoint/>, div);
    ReactDOM.unmountComponentAtNode(div);
});