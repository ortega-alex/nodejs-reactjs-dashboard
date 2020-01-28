import React, { Component } from 'react';
import { connect } from 'react-redux';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';
import Posicion from './pantallas/posicion.component';
import Grupo from './pantallas/grupo.component';
import Top from './pantallas/top.component';

const logoOca = require('../../media/logo_oca.png');
const _intervalo = 30000;

class Gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: null,
            descripcion: null,
            interval_transicion: null,
            interval_consulta: null,
            indicadores_intervalos: undefined,
            transicion: 0,
            intervalo: 0,
            vista_top: 0
        };
    }

    componentDidMount() {
        this.handleGetIndicador();
        this.setState({ interval_consulta: setInterval(() => { this.handleGetIndicador() }, 1800000) });
    }

    componentWillUnmount() {
        this.handleClearInterval();
    }

    render() {
        const { supervisor } = this.props;
        const { indicadores } = this.props;
        return (
            <div onClick={() => {
                this.handleClearInterval();
                this.props.changeView(1);
            }}>
                {indicadores && indicadores.length > 0 &&
                    this.handleView()
                }

                <footer id="sticky-footer">
                    <div className="row">
                        <div className="col-4 logo-oca">
                            <img height="70" src={logoOca} />
                        </div>
                        <div className="col-4 offset-4 logo-departamento">
                            <img height="90" src={Function.getLogoDepartamento(supervisor.id_cartera_depto)} alt="Sin Logo" />
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    handleGetIndicador() {
        const { supervisor } = this.props;
        this.props.dispatch(IndicadorActions.getGestoresSupervisor(supervisor.id_usuario));
    }

    handleView() {
        const { indicadores, top_primeros_3, top_ultimos_3 } = this.props;
        const { indicadores_intervalos, transicion, intervalo, vista_top } = this.state;
        if (!indicadores_intervalos) {            
            var _intervalos = {
                transiciones: indicadores.length,
                intervalos: []
            };
            indicadores.forEach((element, i) => {
                _intervalos.intervalos[i] = Math.ceil(element.gestores.length / 3);
            });
            console.log("entra", _intervalos);
            this.setState({
                indicadores_intervalos: _intervalos, interval_transicion: setInterval(() => {
                    this.handleProgramarIntervalo()
                }, _intervalo)
            }, () => {
                this.handleProgramarIntervalo(0);
            });
        }

        return (
            <div>
                <div className="row text-center">
                    {indicadores_intervalos && indicadores &&
                        <div className="col-md-8 offset-md-2">
                            <p className="m-0 p-0 h1">
                                {transicion < indicadores_intervalos.transiciones ?
                                    indicadores[transicion].titulo : ((vista_top == 0 ? "Top 3 " : "") + "recuperación por producto")}
                            </p>
                            {(transicion < indicadores_intervalos.transiciones) ?
                                <p className="p-0 m-0 h1">Total: {indicadores[transicion].tipo} {Function.commaSeparateNumber(indicadores[transicion].total)}</p>
                                : <p className="p-0 m-0 h1">{vista_top == 0 ? 'Primeros ' : 'Ultimos '} lugares</p>
                            }
                            <br />
                        </div>
                    }
                </div>

                {(indicadores && indicadores.length > 0 &&
                    intervalo == 0 && indicadores_intervalos &&
                    transicion < indicadores_intervalos.transiciones) &&
                    <Posicion indicador={indicadores[transicion]} />
                }

                {(indicadores && indicadores.length > 0 &&
                    intervalo > 0 && indicadores_intervalos &&
                    transicion < indicadores_intervalos.transiciones) &&
                    <Grupo
                        gestores={this.handleGetGrupo(indicadores[transicion].gestores)}
                        tipo={indicadores[transicion].tipo}
                        intervalo={intervalo > 1 ? (((intervalo - 1) * 3) + 1) : 1}
                    />
                }

                {(((top_primeros_3 && top_primeros_3.length > 0) || (top_ultimos_3 && top_ultimos_3.length > 0)) &&
                    (indicadores_intervalos && transicion == indicadores_intervalos.transiciones)) &&
                    <Top top={vista_top == 0 ? top_primeros_3 : top_ultimos_3} lugar={vista_top == 0 ? 1 : 3} />
                }
            </div>
        )
    }

    handleProgramarIntervalo(inicial = 1) {
        const { indicadores_intervalos, transicion } = this.state;
        var _transicion = inicial == 0 ? 0 : (transicion < indicadores_intervalos.transiciones ? _transicion = transicion + 1 : 0);
        if (_transicion < indicadores_intervalos.transiciones) {
            var cantidad = (indicadores_intervalos.intervalos[_transicion] + 1);
            var _times = _intervalo / cantidad;
            for (let index = 1; index < cantidad; index++) {
                setTimeout(() => {
                    const { intervalo } = this.state;
                    this.setState({ intervalo: intervalo + 1 });
                }, _times * index);
            }
        } else {
            var _times = _intervalo / 2;
            setTimeout(() => {
                this.setState({ vista_top: 1 });
            }, _times);
        }
        this.setState({ transicion: _transicion, intervalo: 0 });
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
        clearInterval(this.state.interval_transicion);
        clearInterval(this.state.interval_trinterval_consultansicion);
        this.setState({
            titulo: null,
            descripcion: null,
            interval_transicion: null,
            interval_consulta: null,
            indicadores_intervalos: undefined,
            transicion: 0,
            intervalo: 0,
            vista_top: 0
        });
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { indicadores, top_primeros_3, top_ultimos_3 } = _indicador;
    return { indicadores, top_primeros_3, top_ultimos_3 };
}

export default connect(mapStateToProps)(Gestor);