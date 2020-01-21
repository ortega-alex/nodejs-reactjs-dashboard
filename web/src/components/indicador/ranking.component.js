import React, { Component } from 'react';

import Target from '../../_helpers/Target';
import Progress from '../../_helpers/Progress';
import Function from '../../_helpers/Function';

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lugar: 13,
            descripcion: "Primer lugar",
            usuario: {
                nombre_completo: 'Josue Ariel Urizar Ramirez',
                tipo: '#',
                indicador: 9
            }
        }
    }

    render() {
        const { indicador, supervisor, recuperacion } = this.props;
        return (
            <div className="container">
                <div className="row mt-2">
                    <div className="col-md-4 offset-md-4 text-center">
                        <h3 className="m-0 p-0">{indicador.titulo} {supervisor.departamento}</h3>
                        <p className="m-0 p-0 h4">
                            Diferencia: Q
                            {
                                recuperacion && recuperacion.gestores.length > 0 ?
                                    Function.commaSeparateNumber(Math.round(parseFloat(recuperacion.gestores[0].indicador - recuperacion.gestores[indicador.gestores.length - 1].indicador)))
                                    : 0
                            }
                        </p>
                    </div>
                </div>
                <br />
                {indicador.gestores && indicador.gestores.length > 0 &&
                    <div className="row">
                        <div className="col-md-4">
                            <Target
                                lugar={1}
                                tipo={'Global: ' + indicador.tipo}
                                usuario={indicador.gestores[0]}
                                descripcion="Primer lugar del equipo."
                                changeView={this.handleClose.bind(this)}
                                total={recuperacion && recuperacion.gestores.length > 0 ? recuperacion.gestores[0].indicador : 0}
                            />
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="row" style={{ height: '85%', paddingTop: '20%' }}>
                                <div className="col-4 offset-2">
                                    <div className="progress-ranking">
                                        <Progress
                                            height="0"
                                            width="50%"
                                            direccion={1}
                                            indicador={indicador.gestores[0].indicador}
                                            tipo={indicador.tipo}
                                            total={indicador.total}
                                            invertir={indicador.titulo == 'Ranking' ? false : true}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="progress-ranking">
                                        <Progress
                                            height="0"
                                            width="50%"
                                            direccion={1}
                                            indicador={indicador.gestores[indicador.gestores.length - 1].indicador}
                                            tipo={indicador.tipo}
                                            total={indicador.total}
                                            invertir={indicador.titulo == 'Ranking' ? false : true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Target
                                lugar={3}
                                tipo={'Global: ' + indicador.tipo}
                                usuario={indicador.gestores[indicador.gestores.length - 1]}
                                descripcion="Ultimo Lugar del equip.o"
                                changeView={this.handleClose.bind(this)}
                                total={recuperacion && recuperacion.gestores.length > 0 ?
                                    recuperacion.gestores[indicador.gestores.length - 1].indicador : 0}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }

    handleClose(evt) {
        this.props.changeView(evt);
    }
}

export default Ranking;