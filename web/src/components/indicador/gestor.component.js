import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Progress as ProgressAntd } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Progress from '../../_helpers/Progress';

const _height = window.innerHeight;
const _width = window.innerWidth;

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: null,
            time: null,
            view: true,
            _ind: 0
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(this.props.id_supervisor));
        this.setState({ time: setInterval(() => { this.handleGetIndicador() }, 1800000) });
        this.setState({ time: setInterval(() => { this.handleView() }, 5000) });
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { view, _ind } = this.state;
        const { indicadores } = this.props;
        return (
            <div style={{ width: _width, height: _height, position: 'relative' }}>
                {view == true ?
                    this.handleGetHorizontal()
                    : this.handleGetVertical()
                }
                {indicadores &&
                    <div style={{ position: 'absolute', top: '20%', left: '40%' }}>
                        <ProgressAntd
                            type="circle"
                            percent={90}
                            format={() =>
                                <div style={{ fontSize: '1rem' }}>
                                    <p className="m-0 p-0"><b>{indicadores[_ind].titulo}</b></p>
                                    {indicadores[_ind].tipo == 'Q' ?
                                        <p className="m-0 p-0">{indicadores[_ind].tipo + ' ' + Function.commaSeparateNumber(parseFloat(indicadores[_ind].total).toFixed(2))}</p>
                                        :
                                        <p className="m-0 p-0">{indicadores[_ind].tipo + ' ' + indicadores[_ind].total}</p>
                                    }
                                </div>
                            }
                            width={150}
                            showInfo={true}
                        />
                    </div>
                }
            </div>
        );
    }

    handleGetHorizontal() {
        const { _ind } = this.state;
        const { indicadores } = this.props;
        return (
            <div>
                {indicadores &&
                    <div className="row">
                        <div className="col-8">
                            {indicadores[_ind].gestores.map((res, i) => {
                                return (
                                    <div className="row" key={i}>
                                        <div
                                            className="col-2 ml-2" style={{ maxWidth: (_height / indicadores[_ind].gestores.length) + 10 }}
                                            onClick={() => {
                                                this.handleClearInterval();
                                                this.props.changeView(1);
                                            }}
                                        >
                                            <img
                                                height={_height / indicadores[_ind].gestores.length}
                                                width={_height / indicadores[_ind].gestores.length}
                                                src={Function.getImage(res.nombre_completo)}
                                                className="avatar"
                                                alt="Sin Imagen"
                                            />
                                        </div>
                                        <div className="col-10" style={{ height: _height / indicadores[_ind].gestores.length }} >
                                            <p className="m-0 p-0" style={{ fontSize: '1vh' }}>
                                                <b>{res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                            </p>
                                            <Progress
                                                height="33%"
                                                width="0"
                                                direccion={0}
                                                indicador={res.indicador}
                                                tipo={indicadores[_ind].tipo}
                                                total={indicadores[_ind].total}
                                                invertir={indicadores[_ind].titulo == 'Ranking' ? false : true}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-3">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <br />
                                    <p className="m-0 p-0 h3">{indicadores[_ind].titulo}</p>
                                    <p className="p-0 m-0">{indicadores[_ind].descr}</p>
                                </div>
                            </div>
                            {indicadores[_ind].gestores.length > 0 &&
                                <div className="row">
                                    <div className="col-12 m-0 p-0">
                                        <div className={`target ${Function.getFondo(4)}`}>
                                            <img
                                                height="150"
                                                width="150"
                                                src={Function.getImage(indicadores[_ind].gestores[0].nombre_completo)}
                                                className="avatar"
                                                alt="Sin Imagen"
                                                onClick={() => {
                                                    this.handleClearInterval();
                                                    this.props.changeView(1);
                                                }}
                                            />
                                            <Icon
                                                type="zoom-out"
                                                className="icon-target"
                                                onClick={() => {
                                                    this.handleClearInterval();
                                                    this.props.changeView(1);
                                                }} />
                                            <p className="h6 m-0 p-0 w-100">{indicadores[_ind].gestores[0].nombre_completo}</p>
                                            <p className="m-0 p-0 w-100">PRIMER LUGAR</p>
                                            <p className="m-0 p-0 w-100 h5">{indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].gestores[0].indicador)}</p>
                                        </div>
                                    </div>

                                    <div className="col-12 m-0 p-0">
                                        <div className={`target ${Function.getFondo(13)}`} >
                                            <img
                                                height="150"
                                                width="150"
                                                src={Function.getImage(indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].nombre_completo)}
                                                className="avatar"
                                                alt="Sin Imagen"
                                                onClick={() => {
                                                    this.handleClearInterval();
                                                    this.props.changeView(1);
                                                }}
                                            />
                                            <Icon
                                                type="zoom-out"
                                                className="icon-target"
                                                onClick={() => {
                                                    this.handleClearInterval();
                                                    this.props.changeView(1);
                                                }}
                                            />
                                            <p className="h6 m-0 p-0 w-100">{indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].nombre_completo}</p>
                                            <p className="m-0 p-0 w-100">ULTIMO LUGAR</p>
                                            <p className="m-0 p-0 w-100 h5">{indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].indicador)}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }

    handleGetVertical() {
        const { _ind } = this.state;
        const { indicadores } = this.props;
        return (
            <div>
                {indicadores &&
                    <div style={{ width: _width, height: _height }}>
                        <div
                            style={{ height: (_height - 350), display: 'flex', direction: "row" }}
                            onClick={() => {
                                this.handleClearInterval();
                                this.props.changeView(1);
                            }}
                        >
                            {indicadores[_ind].gestores.map((res, i) => {
                                return (
                                    <div key={i} style={{ height: '100%', width: (_width / indicadores[_ind].gestores.length - 8), position: 'relative', textAlign: 'center' }} >
                                        <img
                                            height={_height / indicadores[_ind].gestores.length}
                                            width={_height / indicadores[_ind].gestores.length}
                                            src={Function.getImage(res.nombre_completo)}
                                            className="avatar"
                                            alt="Sin Imagen"
                                        />
                                        <p className="m-0 p-0">
                                            <b>{res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                        </p>
                                        <div style={{ position: 'absolute', bottom: 0, height: '60%', width: '100%', textAlign: 'center' }}>
                                            <Progress
                                                height="0"
                                                width="33%"
                                                direccion={1}
                                                indicador={res.indicador}
                                                tipo={indicadores[_ind].tipo}
                                                total={indicadores[_ind].total}
                                                invertir={indicadores[_ind].titulo == 'Ranking' ? false : true}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ height: 300 }}>
                            {indicadores &&
                                <div className="row text-center">
                                    <div className="col-md-4 offset-md-4">
                                        <p className="m-0 p-0 h3">{indicadores[_ind].titulo}</p>
                                        <p className="p-0 m-0">{indicadores[_ind].descr}</p>
                                    </div>
                                </div>
                            }
                            {indicadores[_ind].gestores.length > 0 &&
                                <div className="row">
                                    <div className="col-4 offset-md-2">
                                        <div className="col-12 m-0 p-0">
                                            <div className={`target ${Function.getFondo(4)}`}>
                                                <img
                                                    height="150"
                                                    width="150"
                                                    src={Function.getImage(indicadores[_ind].gestores[0].nombre_completo)}
                                                    className="avatar"
                                                    alt="Sin Imagen"
                                                    onClick={() => {
                                                        this.handleClearInterval();
                                                        this.props.changeView(1);
                                                    }}
                                                />
                                                <Icon
                                                    type="zoom-out"
                                                    className="icon-target"
                                                    onClick={() => {
                                                        this.handleClearInterval();
                                                        this.props.changeView(1);
                                                    }}
                                                />
                                                <p className="h6 m-0 p-0 w-100">{indicadores[_ind].gestores[0].nombre_completo}</p>
                                                <p className="m-0 p-0 w-100">PRIMER LUGAR</p>
                                                <p className="m-0 p-0 w-100 h5">{indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].gestores[0].indicador)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="col-12 m-0 p-0">
                                            <div className={`target ${Function.getFondo(13)}`} >
                                                <img
                                                    height="150"
                                                    width="150"
                                                    src={Function.getImage(indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].nombre_completo)}
                                                    className="avatar"
                                                    alt="Sin Imagen"
                                                    onClick={() => {
                                                        this.handleClearInterval();
                                                        this.props.changeView(1);
                                                    }}
                                                />
                                                <Icon
                                                    type="zoom-out"
                                                    className="icon-target"
                                                    onClick={() => {
                                                        this.handleClearInterval();
                                                        this.props.changeView(1);
                                                    }}
                                                />
                                                <p className="h6 m-0 p-0 w-100">{indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].nombre_completo}</p>
                                                <p className="m-0 p-0 w-100">ULTIMO LUGAR</p>
                                                <p className="m-0 p-0 w-100 h5">{indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1].indicador)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }

    handleGetIndicador() {
        const { id_supervisor } = this.props;
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(id_supervisor));
    }

    handleView() {
        var { _ind } = this.state;
        const { indicadores } = this.props;
        var _indicador = (_ind == (indicadores.length - 1)) ? 0 : _ind + 1;
        this.setState({ _ind: _indicador, view: !this.state.view })
    }

    handleClearInterval() {
        clearInterval(this.state.interval);
        clearInterval(this.state.time);
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { indicadores } = _indicador;
    return { indicadores };
}

export default connect(mapStateToProps)(Gestor);