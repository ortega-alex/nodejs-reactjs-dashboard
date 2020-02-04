import React, { Component } from 'react';
import { Icon } from 'antd';

import Function from './Function';

class Target extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { lugar, tipo, usuario, descripcion, total } = this.props;
        return (
            <div className="text-center">
                <div style={{ height: 225, width: '100%' }}>
                    <img
                        height="225"
                        width="225"
                        src={Function.getImage(usuario.foto)}
                        className="avatar"
                        alt="Sin Imagen"
                    />
                </div>
                <Icon
                    type="zoom-out"
                    className="icon-target"
                />
                <p className="m-0 p-0 w-100 h1">{usuario.nombres.split(' ')[0]} {usuario.apellidos.split(' ')[0].substr(0,1)}.</p>
                {descripcion &&
                    <p className="m-0 p-0 w-100 h1 text-dark">{descripcion}</p>
                }
                <p className="m-0 p-0 w-100 h1">{tipo} {Function.commaSeparateNumber(Math.round(usuario.indicador))}</p>
                {total &&
                    <p className="m-0 p-0 w-100 h1">Total: Q {Function.commaSeparateNumber(total)}</p>
                }
            </div>
        );
    }
}

export default Target;