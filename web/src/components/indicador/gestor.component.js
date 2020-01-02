import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Progress from '../../_helpers/Progress';

const _height = window.innerHeight;
const _width = window.innerWidth;

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null,
            view: true
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(this.props.id_supervisor));
        this.setState({ time: setInterval(() => { this.handleView() }, 5000) });
    }

    componentWillUnmount() {
        clearInterval(this.state.time);
    }

    render() {
        const { view } = this.state;
        return (
            <div style={{ width: _width, height: _height }}>
                {view == true ?
                    this.handleGetHorizontal()
                    : this.handleGetVertical()
                }
            </div>
        );
    }

    handleGetHorizontal() {
        const { gestores } = this.props;
        return (
            <div className="row">
                <div className="col-md-8">
                    {gestores && gestores.map((res, i) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-2 ml-2" style={{ maxWidth: (_height / gestores.length) + 10 }} onClick={() => this.props.changeView(1)}>
                                    <img
                                        height={_height / gestores.length}
                                        width={_height / gestores.length}
                                        src={Function.getImage(res.nombre_completo)}
                                        className="avatar"
                                        alt="Sin Imagen"
                                    />
                                </div>
                                <div className="col-10" style={{ height: _height / gestores.length }} >
                                    <p className="m-0 p-0" style={{ fontSize: '1vh' }}>
                                        <b>{res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                    </p>
                                    <Progress height="33%" width="0" aplicar={0} indicador={100} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-12 text-center">
                            <br />
                            <p className="m-0 p-0 h3">Indicador</p>
                            <p className="p-0 m-0">infomacion adicional</p>
                        </div>
                    </div>
                    <div className="row">
                        {gestores &&
                            <div className="col-md-12 m-0 p-0">
                                <div className={`target ${Function.getFondo(4)}`}>
                                    <img
                                        height="150"
                                        width="150"
                                        src={Function.getImage(gestores[0].nombre_completo)}
                                        className="avatar"
                                        alt="Sin Imagen"
                                        onClick={() => this.props.changeView(1)}
                                    />
                                    <Icon type="zoom-out" className="icon-target" onClick={() => this.props.changeView(1)} />
                                    <p className="h6 m-0 p-0 w-100">{gestores[0].nombre_completo}</p>
                                    <p className="m-0 p-0 w-100">primer lugar</p>
                                    <br />
                                    <p className="m-0 p-0 w-100">indicador</p>
                                </div>
                            </div>
                        }

                        {gestores &&
                            <div className="col-md-12 m-0 p-0">
                                <div className={`target ${Function.getFondo(13)}`} >
                                    <img
                                        height="150"
                                        width="150"
                                        src={Function.getImage(gestores[gestores.length - 1].nombre_completo)}
                                        className="avatar"
                                        alt="Sin Imagen"
                                        onClick={() => this.props.changeView(1)}
                                    />
                                    <Icon type="zoom-out" className="icon-target" onClick={() => this.props.changeView(1)} />
                                    <p className="h6 m-0 p-0 w-100">{gestores[gestores.length - 1].nombre_completo}</p>
                                    <p className="m-0 p-0 w-100">Ultimo lugar</p>
                                    <br />
                                    <p className="m-0 p-0 w-100">indicador</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleGetVertical() {
        const { gestores } = this.props;
        return (
            <div style={{ width: _width, height: _height }}>
                <div style={{ height: (_height - 350), display: 'flex', direction: "row" }} onClick={() => this.props.changeView(1)}>
                    {gestores && gestores.map((res, i) => {
                        return (
                            <div key={i} style={{ height: '100%', width: (_width / gestores.length - 8), position: 'relative', textAlign: 'center' }} >
                                <img
                                    height={_height / gestores.length}
                                    width={_height / gestores.length}
                                    src={Function.getImage(res.nombre_completo)}
                                    className="avatar"
                                    alt="Sin Imagen"
                                />
                                <p className="m-0 p-0">
                                    <b>{res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                </p>
                                <div style={{ position: 'absolute', bottom: 0, height: '60%', width: '100%', textAlign: 'center' }}>
                                    <Progress height="0" width="33%" aplicar={1} indicador={100} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{ height: 300 }}>
                    <div className="row text-center">
                        <div className="col-md-4 offset-md-4">
                            <p className="m-0 p-0 h3">Indicador</p>
                            <p className="p-0 m-0">infomacion adicional</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 offset-md-1">
                            {gestores &&
                                <div className="col-md-12 m-0 p-0">
                                    <div className={`target ${Function.getFondo(4)}`}>
                                        <img
                                            height="150"
                                            width="150"
                                            src={Function.getImage(gestores[0].nombre_completo)}
                                            className="avatar"
                                            alt="Sin Imagen"
                                            onClick={() => this.props.changeView(1)}
                                        />
                                        <Icon type="zoom-out" className="icon-target" onClick={() => this.props.changeView(1)} />
                                        <p className="h6 m-0 p-0 w-100">{gestores[0].nombre_completo}</p>
                                        <p className="m-0 p-0 w-100">primer lugar</p>
                                        <br />
                                        <p className="m-0 p-0 w-100">indicador</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-md-5">
                            {gestores &&
                                <div className="col-md-12 m-0 p-0">
                                    <div className={`target ${Function.getFondo(13)}`} >
                                        <img
                                            height="150"
                                            width="150"
                                            src={Function.getImage(gestores[gestores.length - 1].nombre_completo)}
                                            className="avatar"
                                            alt="Sin Imagen"
                                            onClick={() => this.props.changeView(1)}
                                        />
                                        <Icon type="zoom-out" className="icon-target" onClick={() => this.props.changeView(1)} />
                                        <p className="h6 m-0 p-0 w-100">{gestores[gestores.length - 1].nombre_completo}</p>
                                        <p className="m-0 p-0 w-100">Ultimo lugar</p>
                                        <br />
                                        <p className="m-0 p-0 w-100">indicador</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleView() {
        this.setState({ view: !this.state.view })
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { gestores } = _indicador;
    return { gestores };
}

export default connect(mapStateToProps)(Gestor);