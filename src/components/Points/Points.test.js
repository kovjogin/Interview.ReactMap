import React from 'react';
import ReactDOM from 'react-dom';
import Points from './Points';

it('Render: PointsComponent`', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Points/>, div);
    ReactDOM.unmountComponentAtNode(div);
});