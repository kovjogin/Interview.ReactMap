import React, {Component} from 'react';

import {Input} from 'reactstrap';


class NewPoint extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Москва, '};

        this.handleChange = this.handleChange.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <Input value={this.state.value} onChange={this.handleChange} onKeyPress={this.handlePress}/>
        );
    }

    handlePress(event) {
        if (event.key === 'Enter' && this.state.value.trim().length > 0) {
            this.props.newPoint(this.state.value);
            this.setState({value: 'Москва, '});
        }
    }
}


export default NewPoint;
