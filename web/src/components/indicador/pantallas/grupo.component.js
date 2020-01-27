import React, { Component } from 'react';
import { Progress as ProgressAntd } from 'antd';

import Progress from '../../../_helpers/Progress';
import Function from '../../../_helpers/Function';

class Grupo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { gestores, total, tipo } = this.props;
        return (
            <div className="gestores">
                {gestores.map((res, i) => {
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
                                <b>{res.nombres.split(' ')[0]} {res.apellidos.split(' ')[0]}</b>
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
                                    indicador={res.indicador}
                                    tipo={tipo}
                                    total={total}
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