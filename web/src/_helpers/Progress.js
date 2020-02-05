import React, { Component } from 'react';
import Function from './Function';

class Progress extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { height, width, direccion, tipo, gestor } = this.props;
        return (
            direccion == 0 ?
                <div style={{ height: '100%', width: '80%', margin: '10%' }}>
                    <div
                        style={{
                            height: height,
                            width: '100%',
                            backgroundColor: 'white',
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                width: `${gestor.meta ? (gestor.meta <= 100 ? gestor.meta : 100) : 1}%`,
                                backgroundColor: Function.colorPorcentaje(gestor.meta ? (gestor.meta <= 100 ? gestor.meta : 100) : 1),
                            }}>
                        </div>
                    </div>
                    <p className="m-0 p-0 h1"><b>{tipo} {Function.commaSeparateNumber(gestor.indicador)}</b></p>
                </div>
                :
                <div style={{ height: '100%', width: '100%' }}>
                    <div style={{ height: '80%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div
                            style={{
                                width: width,
                                height: `${gestor.meta ? (gestor.meta <= 100 ? gestor.meta : 100) : 1}%`,
                                backgroundColor: Function.colorPorcentaje(gestor.meta ? (gestor.meta <= 100 ? gestor.meta : 100) : 1),
                                position: 'absolute',
                                bottom: '0%'
                            }}>
                        </div>
                    </div>
                    <div style={{ height: '20%', position: 'relative' }}>
                        <p
                            className="m-0 p-0 h1"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                textAlign: 'center'
                            }}
                        >
                            <b> {tipo} {Function.commaSeparateNumber(gestor.indicador)}</b>
                        </p>
                    </div>
                </div>
        );
    }
}

export default Progress;