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
            <div className={`target ${Function.getFondo(lugar)}`} >
                <div style={{height: 150, width: '100%'}}>
                    <img
                        height="150"
                        width="150"
                        src={Function.getImage(usuario.foto)}
                        className="avatar"
                        alt="Sin Imagen"
                        onClick={() => { this.props.changeView(1); }}
                    />
                </div>
                <Icon
                    type="zoom-out"
                    className="icon-target"
                    onClick={() => { this.props.changeView(1); }}
                />
                <p className="h6 m-0 p-0 w-100">{usuario.nombre_completo}</p>
                <p className="m-0 p-0 w-100">{descripcion}</p>
                <p className="m-0 p-0 w-100 h5">{tipo} {Function.commaSeparateNumber(usuario.indicador)}</p>
                { total &&
                    <p className="m-0 p-0 w-100 h5">Total: Q {Function.commaSeparateNumber(total)}</p>
                }               
            </div>
        );
    }
}

export default Target;