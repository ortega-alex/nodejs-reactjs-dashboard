import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress as ProgressAntd } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Progress from '../../_helpers/Progress';
import Target from '../../_helpers/Target';

const logoOca = require('../../media/logo_oca.png');

const _height = window.innerHeight;
const _width = window.innerWidth;
const _intervalor = 60000;

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval_consulta: null,
            interval_transicion: null,
            _ind: 0
        };
    }

    componentDidMount() {
        this.handleGetIndicador();
        this.handleView(0);
        this.setState({ interval_consulta: setInterval(() => { this.handleGetIndicador() }, 1800000) });
        this.setState({ interval_transicion: setInterval(() => { this.handleView(1) }, _intervalor) });
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { indicadores, supervisor } = this.props;
        return (
            <div style={{ width: _width, height: _height, position: 'relative' }}>
                {(indicadores && indicadores.length > 0) &&
                    this.handleGestores()
                }
                <div className="logo-oca">
                    <img height="70" src={logoOca} />
                </div>
                <div className="logo-departamento">
                    <img height="90" src={Function.getLogoDepartamento(supervisor.id_cartera_depto)} alt="Sin Logo" />
                </div>
            </div>
        );
    }

    handleGetIndicador() {
        const { supervisor } = this.props;
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(supervisor.id_usuario));
    }

    handleGestores() {
        const { _ind } = this.state;
        const { indicadores, supervisor } = this.props;
        return (
            <div style={{ width: _width, height: _height }}>
                <div className="row text-center">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="m-0 p-0">{indicadores[_ind].titulo}</h1>
                        <p className="p-0 m-0 h1">Total: {indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].total)}</p>
                        <br/>
                    </div>
                </div>
                <div
                    className="scroll-gestores"
                    onClick={() => {
                        this.handleClearInterval();
                        this.props.changeView(1);
                    }}
                    ref={(el) => { this.DivGestores = el }}
                >

                    <div style={{ minWidth: '95%' }}>
                        <div className="row">
                            <div className="col-md-4">
                                <Target
                                    lugar={1}
                                    tipo={indicadores[_ind].tipo}
                                    usuario={indicadores[_ind].gestores[0]}
                                    descripcion="Primer lugar"
                                    changeView={this.handleClose.bind(this)}
                                />
                            </div>
                            <div className="col-md-4 text-center">
                                <div className="row m-0 p-0" style={{ height: '100%' }}>
                                    <div className="col-6 m-0 p-0">
                                        <div className="progress-ranking">
                                            <Progress
                                                height="0"
                                                width="50%"
                                                direccion={1}
                                                indicador={indicadores[_ind].gestores[0].indicador}
                                                tipo={indicadores[_ind].tipo}
                                                total={indicadores[_ind].total}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 m-0 p-0">
                                        <div className="progress-ranking">
                                            <Progress
                                                height="0"
                                                width="50%"
                                                direccion={1}
                                                indicador={indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].indicador}
                                                tipo={indicadores[_ind].tipo}
                                                total={indicadores[_ind].total}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <Target
                                    lugar={3}
                                    tipo={indicadores[_ind].tipo}
                                    usuario={indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1]}
                                    descripcion="Ultimo Lugar"
                                    changeView={this.handleClose.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                    {indicadores[_ind].gestores.map((res, i) => {
                        return (
                            <div key={i} className="indicadores-gestores pt-1" >
                                <div style={{ height: 170, width: '100%' }}>
                                    <ProgressAntd
                                        type="circle"
                                        strokeColor={res.meta ? Function.colorPorcentaje(res.meta) : ''}
                                        percent={res.meta ? parseInt(res.meta) : 0}
                                        format={() =>
                                            <img
                                                height="155"
                                                width="155"
                                                src={Function.getImage(res.foto)}
                                                className="avatar"
                                                alt="Sin Imagen"
                                            />
                                        }
                                        width={170}
                                        showInfo={true}
                                    />
                                </div>
                                <p className="m-0 p-0 h1">
                                    <b> #{i + 1} {res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                </p>
                                <div
                                    style={{
                                        height: '50%',
                                        width: '100%',
                                    }}
                                >
                                    <Progress
                                        height="10%"
                                        width="0"
                                        direccion={0}
                                        indicador={res.indicador}
                                        tipo={indicadores[_ind].tipo}
                                        total={indicadores[_ind].total}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    <div style={{ minWidth: "8%" }}></div>
                </div>
            </div>
        );
    }

    handleView(init) {
        const { _ind } = this.state;
        const { indicadores } = this.props;

        if (this.DivGestores) {
            this.DivGestores.scrollLeft = 0;
        }

        var _times = _intervalor / 5;
        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = _width - 75;
            }
        }, _times);

        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = (_width * 2) - 160;
            }
        }, _times * 2);

        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = (_width * 3) - 250;
            }
        }, _times * 3);

        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = this.DivGestores.scrollHeight * 10;
            }
        }, _times * 4);

        if (init != 0) {
            var _indicador = (_ind == (indicadores.length - 1)) ? 0 : _ind + 1;
            this.setState({ _ind: _indicador });
        }
    }

    handleClearInterval() {
        clearInterval(this.state.interval_consulta);
        clearInterval(this.state.interval_transicion);
    }

    handleClose(evt) {
        this.props.changeView(evt);
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { indicadores } = _indicador;
    return { indicadores };
}

export default connect(mapStateToProps)(Gestor);