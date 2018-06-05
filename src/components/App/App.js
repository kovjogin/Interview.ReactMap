import React, {Component} from 'react';
import Points from '../Points/Points';
import Map from '../Map/Map';
import NewPoint from '../NewPoint/NewPoint';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: []
        };
    }

    newPoint = (name) => {
        this.setState({points: [...this.state.points, name]});
    };

    removePoint = (index) => {
        this.state.points.splice(index, 1);
        this.setState({points: this.state.points});
    };

    reorderPoints = (points) => {
        this.setState({points: points});
    };

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='row'>
                            <NewPoint newPoint={this.newPoint}/>
                        </div>
                        <div className='row'>
                            <Points points={this.state.points} removePoint={this.removePoint} reorderPoints={this.reorderPoints}/>
                        </div>
                    </div>

                    <div className='col-md-8 mt-4 mt-sm-0'>
                        <Map points={this.state.points} reorderPoints={this.reorderPoints}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
