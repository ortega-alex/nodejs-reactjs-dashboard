import React, { Component } from 'react';
import Function from './Function';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            time: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ time: setInterval(() => { this.handleAumentarPorcentaje() }, 10) });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.time);
    }

    render() {
        const { height, width, direccion, tipo, gestor } = this.props;
        const { progress } = this.state;
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
                                width: `${gestor.meta && gestor.meta < 100 ? gestor.meta : 100}%`,
                                backgroundColor: Function.colorPorcentaje(gestor.meta && gestor.meta < 100 ? gestor.meta : 100),
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
                                height: `${progress}%`,
                                backgroundColor: Function.colorPorcentaje(progress),
                                position: 'absolute',
                                bottom: '0%'
                            }}>
                        </div>
                    </div>
                    <div style={{ height: '20%', position: 'relative' }}>
                        <p
                            className="m-0 p-0 h2"
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

    handleAumentarPorcentaje() {
        const { progress } = this.state;
        const { gestor } = this.props;
        var _progress = (progress + 5);
        this.setState({ progress: _progress });
        if (_progress >= gestor.meta || _progress == 100) {
            clearInterval(this.state.time);
        }
    }
}

export default Progress;