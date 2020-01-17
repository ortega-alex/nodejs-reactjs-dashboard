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
        const { height, width, direccion, tipo, indicador } = this.props;
        const { progress } = this.state;
        return (
            direccion == 0 ?
                <div style={{ height: '100%', width: '100%' }}>
                    <div
                        style={{
                            height: height,
                            width: `${progress}%`,
                            backgroundColor: this.handleColor()
                        }}>
                    </div>
                    <p className="m-0 p-0" style={{ fontSize: '1vh' }}><b>{tipo} {Function.commaSeparateNumber(indicador)}</b></p>
                </div>

                :
                <div style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            width: width,
                            height: `${progress - 20}%`,
                            backgroundColor: this.handleColor(),
                            position: 'absolute',
                            bottom: '13%'
                        }}>
                    </div>
                    <p
                        className="m-0 p-0"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        <b> {tipo} {Function.commaSeparateNumber(indicador)}</b>
                    </p>
                </div>
        );
    }

    handleAumentarPorcentaje() {
        const { progress } = this.state;
        const { indicador, total, invertir } = this.props;
        var porcentaje = (indicador > 0 && total > 0) ? ((indicador * 100) / total) : 0;
        if (!invertir) {
            porcentaje = (100 - porcentaje);
        }
        var _progress = (progress + 1);
        this.setState({ progress: _progress });
        if (_progress >= porcentaje) {
            clearInterval(this.state.time);
        }
    }

    handleColor() {
        const { progress } = this.state;
        var  color = (progress < 33) ? '#f44336' : (progress < 66 ? '#f9a825' : '#66bb6a');
        return color;
    }
}

export default Progress;