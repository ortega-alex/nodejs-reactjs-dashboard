import React, { Component } from 'react';
import { PropagateLoader } from 'react-spinners';

export default class Loading extends Component {
    render() {
        return (
            <PropagateLoader
                sizeUnit={"px"}
                size={15}
                color={'#F4D03F'}
            />
        );
    }
}