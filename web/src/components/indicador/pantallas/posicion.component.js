import React, { Component } from 'react';

import Progress from '../../../_helpers/Progress';
import Function from '../../../_helpers/Function';

class Posicion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { indicador } = this.props;
        return (
            <div className="row">
                <div className="col-md-3 m-0 p-0">
                    {this.hangleTarjeta(indicador.gestores[0], "Primer lugar")}
                </div>
                <div className="col-md-6 text-center m-0 p-0">
                    <div className="row m-0 p-0" style={{ height: '100%' }}>
                        <div className="col-6 m-0 p-0">
                            <div className="progress-ranking">
                                <Progress
                                    height="0"
                                    width="50%"
                                    direccion={1}
                                    gestor={indicador.gestores[0]}
                                    tipo={indicador.tipo}
                                />
                            </div>
                        </div>
                        <div className="col-6 m-0 p-0 m-0 p-0">
                            <div className="progress-ranking">
                                <Progress
                                    height="0"
                                    width="50%"
                                    direccion={1}
                                    gestor={indicador.gestores[indicador.gestores.length - 1]}
                                    tipo={indicador.tipo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 m-0 p-0">
                    {this.hangleTarjeta(indicador.gestores[indicador.gestores.length - 1], "Ultimo lugar")}
                </div>
            </div>
        );
    }

    hangleTarjeta(usuario, descripcion) {
        return (
            <div className="text-center">
                <div style={{ height: 225, width: '100%' }}>
                    <img
                        height="225"
                        width="225"
                        src={usuario.foto ? Function.getImage(usuario.foto) : ''}
                        className="avatar"
                        alt="Sin Imagen"
                    />
                </div>
                <p className="m-0 p-0 w-100 h1">{usuario.nombres.split(' ')[0]} {usuario.apellidos.split(' ')[0].substr(0, 1)}.</p>
                <p className="m-0 p-0 w-100 h1 posicion">{descripcion}</p>
            </div>
        )
    }
}

export default Posicion;