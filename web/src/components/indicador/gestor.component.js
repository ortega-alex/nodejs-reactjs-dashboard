import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Progress as ProgressAntd } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Progress from '../../_helpers/Progress';
import Ranking from './ranking.component';
import Target from '../../_helpers/Target';

const _height = window.innerHeight;
const _width = window.innerWidth;

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: null,
            time: null,
            view: true,
            _ind: 0,
            _gestor: 3
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(this.props.id_supervisor));
        // this.setState({ time: setInterval(() => { this.handleGetIndicador() }, 1800000) });
        this.setState({ time: setInterval(() => { this.handleView() }, 10000) });
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { view, _ind } = this.state;
        const { indicadores } = this.props;
        return (
            <div style={{ width: _width, height: _height, position: 'relative' }}>
                {indicadores && indicadores.length > 0 &&
                    view ?
                    <Ranking indicador={indicadores[0]} changeView={this.props.changeView()} />
                    : this.handleGetVertical()
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
                            style={{ height: '45%', display: 'flex', direction: "row", width: '100%', overflowX: 'auto' }}
                            onClick={() => {
                                this.handleClearInterval();
                                this.props.changeView(1);
                            }}
                            ref={(el) => { this.DivGestores = el }}
                        >
                            {indicadores[_ind].gestores.map((res, i) => {
                                return (
                                    <div key={i} className="indicadores-gestores" >
                                        <img
                                            height="150"
                                            width="150"
                                            src={Function.getImage(res.nombre_completo)}
                                            className="avatar"
                                            alt="Sin Imagen"
                                        />
                                        <p className="m-0 p-0">
                                            <b> #{i + 1} {res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                        </p>
                                        <div
                                            style={{
                                                position:
                                                    'absolute',
                                                bottom: 0,
                                                height: '50%',
                                                width: '100%',
                                            }}
                                        >
                                            <Progress
                                                height="0"
                                                width="25%"
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
                            {indicadores &&
                                <div style={{ minWidth: '8%' }}></div>
                            }
                        </div>
                        <div style={{ height: '55%' }}>
                            {indicadores &&
                                <div className="row text-center">
                                    <div className="col-md-4 offset-md-4">
                                        <h4 className="m-0 p-0">{indicadores[_ind].titulo}</h4>
                                        <p className="p-0 m-0">{indicadores[_ind].descr}</p>
                                        <p className="p-0 m-0 h6">{indicadores[_ind].tipo} {indicadores[_ind].total}</p>
                                    </div>
                                </div>
                            }
                            {indicadores[_ind].gestores.length > 0 &&
                                <div className="row">
                                    <div className="col-3 offset-md-3">
                                        <Target
                                            lugar={1}
                                            tipo={indicadores[_ind].tipo}
                                            usuario={indicadores[_ind].gestores[0]}
                                            descripcion="Primer lugar del Equipo"
                                            changeView={this.props.changeView()}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <Target
                                            lugar={3}
                                            tipo={indicadores[_ind].tipo}
                                            usuario={indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1]}
                                            descripcion="Ultimo lugar del Equipo"
                                            changeView={this.props.changeView()}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }

    handleView() {
        this.setState({ view: false });
        var { _ind } = this.state;
        const { indicadores } = this.props;
        var _indicador = (_ind == (indicadores.length - 1)) ? 0 : _ind + 1;
        if (this.DivGestores) {
            this.DivGestores.scrollLeft = 0;
            setTimeout(() => {
                this.DivGestores.scrollLeft = _width - 100;
            }, 3333);
            setTimeout(() => {
                this.DivGestores.scrollLeft = this.DivGestores.scrollHeight * 10;
            }, 6666);
        }
        this.setState({ _ind: _indicador });
    }

    handleDivGestores() {
        const { _gestor } = this.state;
        if (this.DivGestores) {
            this.DivGestores.scrollLeft = (this.DivGestores.scrollHeight * _gestor);
        }
        this.setState({ _gestor: _gestor + 3 });
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