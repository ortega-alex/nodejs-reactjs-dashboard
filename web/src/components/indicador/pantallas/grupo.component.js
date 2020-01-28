import React, { Component } from 'react';
import { Progress as ProgressAntd } from 'antd';

import Progress from '../../../_helpers/Progress';
import Function from '../../../_helpers/Function';

class Grupo extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log("en cada intervalo");
    }

    render() {
        const { gestores, tipo, intervalo } = this.props;
        return (
            <div className="gestores">
                {gestores && gestores.map((res, i) => {
                    return (
                        <div key={i} className="indicadores-gestores pt-1" >
                            <div style={{ height: 170, width: '100%' }}>
                                <ProgressAntd
                                    type="circle"
                                    strokeColor={res.meta ? Function.colorPorcentaje(res.meta) : ''}
                                    percent={res.meta ? parseInt(res.meta) : 0}
                                    format={() =>
                                        <img
                                            height="155"
                                            width="155"
                                            src={Function.getImage(res.foto)}
                                            className="avatar"
                                            alt="Sin Imagen"
                                        />
                                    }
                                    width={170}
                                    showInfo={true}
                                />
                            </div>
                            <p className="m-0 p-0 h1">
                                <b> #{i + intervalo} {res.nombres.split(' ')[0]}</b>
                            </p>
                            <p className="m-0 p-0 h1">
                                <b> {res.apellidos.split(' ')[0]}</b>
                            </p>
                            <div
                                style={{
                                    height: '50%',
                                    width: '100%',
                                }}
                            >
                                <Progress
                                    height="25px"
                                    width="0"
                                    direccion={0}
                                    gestor={res}
                                    tipo={tipo}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grupo;