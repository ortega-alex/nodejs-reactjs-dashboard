import React, { Component } from 'react';

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
        const { height, width, aplicar } = this.props;
        const { progress } = this.state;
        return (
            aplicar == 0 ?
                <div style={{ height: '100%', width: '100%' }}>
                    <div
                        style={{
                            height: height,
                            width: `${progress}%`,
                            backgroundColor: progress < 33 ? '#f44336' : (progress < 66 ? '#f9a825' : '#66bb6a')
                        }}>
                    </div>
                    <p className="m-0 p-0" style={{ fontSize: '1vh' }}><b>{progress}%</b></p>
                </div>

                :
                <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                    <div
                        style={{
                            width: width,
                            height: `${progress}%`,
                            backgroundColor: progress < 33 ? '#f44336' : (progress < 66 ? '#f9a825' : '#66bb6a'),
                            position: 'absolute',
                            bottom: '8%',
                            marginLeft: '33%'
                        }}>
                    </div>
                    <p
                        className="m-0 p-0"
                        style={{
                            fontSize: '1vh',
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >
                        <b>{progress}%</b>
                    </p>
                </div>
        );
    }

    handleAumentarPorcentaje() {
        const { progress } = this.state;
        const { indicador } = this.props;
        var _progress = (progress + 5);
        this.setState({ progress: _progress });
        if (_progress >= indicador) {
            clearInterval(this.state.time);
        }
    }
}

export default Progress;