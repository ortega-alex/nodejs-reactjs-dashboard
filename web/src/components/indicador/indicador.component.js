import React, { Component } from 'react';
import { connect } from 'react-redux';

class Indicador extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div> Indicador </div>
        );
    }
}

export default connect()(Indicador);