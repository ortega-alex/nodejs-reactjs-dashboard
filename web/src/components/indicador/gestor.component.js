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
            interval_consulta: null,
            interval_transicion: null,
            _ind: 0,
            _gestor: 3
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(this.props.id_supervisor));
        this.setState({ interval_consulta: setInterval(() => { this.handleGetIndicador() }, 1800000) });
        this.setState({ interval_transicion: setInterval(() => { this.handleView() }, 10000) });
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { _ind } = this.state;
        const { indicadores } = this.props;
        return (
            <div style={{ width: _width, height: _height, position: 'relative' }}>
                {(indicadores && indicadores.length > 0) &&
                    <div>
                        {_ind == 0 ?
                            <Ranking indicador={indicadores[0]} changeView={this.handleClose.bind(this)} />
                            : this.handleGetVertical()
                        }
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
                <div style={{ width: _width, height: _height }}>
                    <div
                        className="scroll-gestores"
                        onClick={() => {
                            this.handleClearInterval();
                            this.props.changeView(1);
                        }}
                        ref={(el) => { this.DivGestores = el }}
                    >
                        {indicadores[_ind].gestores.map((res, i) => {
                            return (
                                <div key={i} className="indicadores-gestores pt-1" >
                                    <div style={{ height: 115, width: '100%' }}>
                                        {res.meta ?
                                            <ProgressAntd
                                                type="circle"
                                                strokeColor={Function.colorPorcentaje(res.meta)}
                                                percent={res.meta ? parseInt(res.meta) : 0}
                                                format={() =>
                                                    <img
                                                        height="100"
                                                        width="100"
                                                        src={Function.getImage(res.nombre_completo)}
                                                        className="avatar"
                                                        alt="Sin Imagen"
                                                    />
                                                }
                                                width={115}
                                                showInfo={true}
                                            />
                                            :
                                            <img
                                                height="100"
                                                width="100"
                                                src={Function.getImage(res.nombre_completo)}
                                                className="avatar"
                                                alt="Sin Imagen"
                                            />
                                        }
                                    </div>
                                    <p className="m-0 p-0">
                                        <b> #{i + 1} {res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
                                    </p>
                                    {res.meta &&
                                        <p className="m-0 p-0">
                                            <b> Meta: {parseInt(res.meta)}%</b>
                                        </p>
                                    }
                                    <div
                                        style={{
                                            position:
                                                'absolute',
                                            bottom: 0,
                                            height: '40%',
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
                        <div style={{ minWidth: '8%' }}></div>
                    </div>
                    <div style={{ height: '55%' }}>
                        <div className="row text-center">
                            <div className="col-md-4 offset-md-4">
                                <h4 className="m-0 p-0">{indicadores[_ind].titulo}</h4>
                                <p className="p-0 m-0">{indicadores[_ind].descr}</p>
                                <p className="p-0 m-0 h6">{indicadores[_ind].tipo} {Function.commaSeparateNumber(indicadores[_ind].total)}</p>
                            </div>
                        </div>

                        {indicadores[_ind].gestores.length > 0 &&
                            <div className="row">
                                <div className="col-3 offset-md-3">
                                    <Target
                                        lugar={1}
                                        tipo={indicadores[_ind].tipo}
                                        usuario={indicadores[_ind].gestores[0]}
                                        descripcion="Primer lugar del Equipo"
                                        changeView={this.handleClose.bind(this)}
                                    />
                                </div>
                                <div className="col-3">
                                    <Target
                                        lugar={3}
                                        tipo={indicadores[_ind].tipo}
                                        usuario={indicadores[_ind].gestores[indicadores[_ind].gestores.length - 1]}
                                        descripcion="Ultimo lugar del Equipo"
                                        changeView={this.handleClose.bind(this)}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleView() {
        const { _ind } = this.state;
        const { indicadores } = this.props;
        var _indicador = (_ind == (indicadores.length - 1)) ? 0 : _ind + 1;

        if (this.DivGestores) {
            this.DivGestores.scrollLeft = 0;
        }

        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = _width - 155;
            }
        }, 3333);
        setTimeout(() => {
            if (this.DivGestores) {
                this.DivGestores.scrollLeft = this.DivGestores.scrollHeight * 10;
            }
        }, 6666);

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