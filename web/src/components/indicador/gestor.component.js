import React, { Component } from 'react';
import { connect } from 'react-redux';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Posicion from './pantallas/posicion.component';
import Grupo from './pantallas/grupo.component';
import Top from './pantallas/top.component';

const logoOca = require('../../media/logo_oca.png');

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval_consulta: null,
            interval_view: null,
            transicion: 0,
            vista: 0,
            intervalo: 0,
            vista_top: 0,
            android: false
        };
    }

    componentDidMount() {
        this.handleGetIndicador();
        this.setState({ interval_consulta: setInterval(() => { this.handleGetIndicador() }, 1800000) });
        this.handleInitiaclization();
        const _navegador = navigator.userAgent;
        if (_navegador.indexOf('Chrome') > 0 && _navegador.indexOf('Android') > 0) {
            this.setState({ android: true });
        }
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { supervisor, indicadores } = this.props;
        const { android } = this.state;

        return (
            <div onClick={() => {
                if (!supervisor.cargo || supervisor.cargo != 0) {
                    this.handleClearInterval();
                    this.props.changeView(1);
                }
            }} style={{ height: '100%' }}>
                <div style={{ height: android ? '75%' : '85%' }}>
                    {(indicadores && indicadores.length > 0) &&
                        this.handleView()
                    }
                </div>
                <div style={{ height: '13%' }} className="footer">
                    <div className="row text-center">
                        <div className="col-3">
                            <img height="70" src={logoOca} />
                        </div>
                        <div className="col-6">
                            <br />
                            <h1 className="m-0 p-0 w-100 h1">{supervisor.primer_nombre + ' ' + supervisor.primer_apellido}</h1>
                        </div>
                        <div className="col-3">
                            <img height="90" src={Function.getLogoDepartamento(supervisor.id_cartera_depto)} alt="Sin Logo" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleGetIndicador() {
        const { supervisor } = this.props;
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(supervisor.id_usuario));
    }

    handleInitiaclization() {
        const { indicadores } = this.props;
        this.setState({
            interval_view: setTimeout(() => {
                if (indicadores && indicadores.length > 0) {
                    this.handleSetVista(0);
                } else {
                    this.handleInitiaclization();
                }
            }, 1000)
        });
    }

    handleView() {
        const { indicadores, top_primeros_3, top_ultimos_3, tiempo_transiciones, total_transiciones } = this.props;
        const { transicion, vista, intervalo, vista_top } = this.state;

        return (
            <div>
                <div className="row text-center">
                    {indicadores &&
                        <div className="col-md-12">
                            <p className="m-0 p-0 h1">
                                {indicadores[transicion].titulo +
                                    (indicadores[transicion].total ?
                                        ': ' + indicadores[transicion].tipo + ' ' + Function.commaSeparateNumber(indicadores[transicion].total) : '')}
                            </p>
                            <br />
                        </div>
                    }
                </div>

                {(vista == 0 && indicadores[transicion]) &&
                    <Posicion indicador={indicadores[transicion]} />
                }

                {(vista == 1 && indicadores[transicion]) &&
                    <Grupo
                        gestores={this.handleGetGrupo(indicadores[transicion].gestores)}
                        tipo={indicadores[transicion].tipo}
                        intervalo={intervalo > 1 ? (((intervalo - 1) * 3) + 1) : 1}
                    />
                }

                {vista == 2 &&
                    <Top top={vista_top == 0 ? top_primeros_3 : top_ultimos_3} lugar={vista_top == 0 ? 1 : 3} />
                }
            </div>
        );
    }

    handleSetVista(vista) {
        const { indicadores, tiempo_transiciones, total_transiciones } = this.props;
        const { transicion } = this.state;
        this.setState({ vista }, () => {

            if (vista === 0) {
                this.setState({
                    interval_view: setTimeout(() => {
                        this.handleSetVista(1);
                    }, tiempo_transiciones.sg_lugar * 1000)
                });
            }

            if (vista === 1) {
                var cantidad = Math.ceil(indicadores[transicion].gestores.length / 3);
                var _times = (tiempo_transiciones.sg_grupo * 1000) / cantidad;
                for (let index = 1; index <= cantidad; index++) {
                    this.setState({
                        interval_view: setTimeout(() => {
                            const { intervalo } = this.state;
                            this.setState({ intervalo: intervalo + 1 });
                            if (index === cantidad) {
                                this.setState({
                                    interval_view: setTimeout(() => {
                                        if (transicion < (total_transiciones - 2)) {
                                            this.setState({ transicion: transicion + 1, intervalo: 0 }, () => {
                                                this.handleSetVista(0);
                                            });
                                        } else {
                                            this.setState({ transicion: transicion + 1, intervalo: 0 }, () => {
                                                this.handleSetVista(2);
                                            });
                                        }
                                    }, _times)
                                });
                            }
                        }, _times * index)
                    });
                }
            }

            if (vista === 2) {
                var _times = (tiempo_transiciones.sg_top * 1000) / 2;
                this.setState({
                    interval_view: setTimeout(() => {
                        this.setState({ transicion: transicion + 1, vista_top: 1 });
                        this.setState({
                            interval_view: setTimeout(() => {
                                this.setState({ transicion: 0, intervalo: 0, vista_top: 0 }, () => {
                                    this.handleSetVista(0);
                                });
                            }, _times)
                        });
                    }, _times)
                });
            }
        });
    }

    handleGetGrupo(gestores) {
        const { intervalo } = this.state;
        var inicio = (intervalo > 0) ? ((intervalo - 1) * 3) : 0;
        var fin = inicio;
        var index = 0;
        for (let i = inicio; i < gestores.length; i++) {
            if (index < 3) {
                fin++;
                index++;
            }
        }
        return gestores.slice(inicio, fin);
    }

    handleClearInterval() {
        clearInterval(this.state.interval_consulta);
        clearInterval(this.state.interval_view);
        this.setState({
            interval_consulta: null,
            interval_view: null,
            transicion: 0,
            vista: 0,
            intervalo: 0,
            vista_top: 0
        });
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { indicadores, top_primeros_3, top_ultimos_3, tiempo_transiciones, total_transiciones } = _indicador;
    return { indicadores, top_primeros_3, top_ultimos_3, tiempo_transiciones, total_transiciones };
}

export default connect(mapStateToProps)(Gestor);