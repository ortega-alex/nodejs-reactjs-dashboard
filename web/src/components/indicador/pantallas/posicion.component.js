import React, { Component } from 'react';

import Target from '../../../_helpers/Target';
import Progress from '../../../_helpers/Progress';

class Posicion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { indicador } = this.props;
        return (
            <div className="row" style={{ position: 'relative' }}>
                <div className="col-md-4 m-0 p-0">
                    <Target
                        lugar={1}
                        tipo={indicador.tipo}
                        usuario={indicador.gestores[0]}
                        descripcion="Primer lugar"
                    />
                </div>
                <div className="col-md-4 text-center m-0 p-0">
                    <div className="row m-0 p-0" style={{ height: '100%' }}>
                        <div className="col-6 m-0 p-0">
                            <div className="progress-ranking">
                                <Progress
                                    height="0"
                                    width="50%"
                                    direccion={1}
                                    indicador={indicador.gestores[0].indicador}
                                    tipo={indicador.tipo}
                                    total={indicador.total}
                                />
                            </div>
                        </div>
                        <div className="col-6 m-0 p-0 m-0 p-0">
                            <div className="progress-ranking">
                                <Progress
                                    height="0"
                                    width="50%"
                                    direccion={1}
                                    indicador={indicador.gestores[indicador.gestores.length - 1].indicador}
                                    tipo={indicador.tipo}
                                    total={indicador.total}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 m-0 p-0">
                    <Target
                        lugar={3}
                        tipo={indicador.tipo}
                        usuario={indicador.gestores[indicador.gestores.length - 1]}
                        descripcion="Ultimo Lugar"
                    />
                </div>
            </div>
        );
    }
}

export default Posicion;