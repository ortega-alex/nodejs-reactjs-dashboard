import React, { Component } from 'react';

import Target from '../../_helpers/Target';
import Function from '../../_helpers/Function';
import Progress from '../../_helpers/Progress';

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

    componentDidMount() {

    }

    render() {
        const { indicador } = this.props;
        return (
            <div className="container">
                <div className="row mt-2">
                    <div className="col-md-4 offset-md-4 text-center">
                        <h4 className="m-0 p-0">{indicador.titulo}</h4>
                        <p className="m-0 p-0">{indicador.descr}</p>
                        <p className="m-0 p-0 h5">{indicador.tipo} {Function.commaSeparateNumber(indicador.total)}</p>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-4">
                        {indicador.gestores && indicador.gestores.length > 0 &&
                            <Target 
                                lugar={1} 
                                tipo={'Global: ' + indicador.tipo} 
                                usuario={indicador.gestores[0]} 
                                descripcion="Primer lugar del Equipo" 
                                changeView={this.props.changeView()}
                            />
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="row" style={{height: '100%'}}>
                            <div className="col-4">
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
                            <div className="col-4">
                                <div className="progress-ranking">
                                    <Progress
                                        height="0"
                                        width="50%"
                                        direccion={1}
                                        indicador={indicador.gestores[1].indicador}
                                        tipo={indicador.tipo}
                                        total={indicador.total}
                                        invertir={indicador.titulo == 'Ranking' ? false : true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {indicador.gestores && indicador.gestores.length > 1 &&
                            <Target 
                                lugar={2} 
                                tipo={'Gloabal: ' + indicador.tipo} 
                                usuario={indicador.gestores[1]} 
                                descripcion="Segundo lugar del equipo" 
                                changeView={this.props.changeView()}
                            />
                        }
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center">
                        {indicador.gestores && indicador.gestores.length > 0 &&
                            <Target 
                                lugar={3} 
                                tipo={'Global: ' + indicador.tipo} 
                                usuario={indicador.gestores[indicador.gestores.length - 1]} 
                                descripcion="Ultimo Lugar del equipo"
                                changeView={this.props.changeView()}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Ranking;