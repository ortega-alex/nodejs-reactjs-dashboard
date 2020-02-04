import React, { Component } from 'react';

import Function from '../../../_helpers/Function';
const _top = require('../../../media/top.gif');

class Top extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { top, lugar } = this.props;
        return (
            <div className="row" style={{ position: 'relative' }}>
                {top && top.map((item, i) => {
                    return (
                        <div className="col-md-4 animacion-posicion" key={i}>
                            {this.hangleTarjeta((lugar != 3) ? (i + 1) : undefined, item, "Q")}
                            <div className="text-center">
                                <p className="m-0 p-0 w-100 h1">{item.nombres_super.split(' ')[0]} {item.apellidos_super.split(' ')[0]}</p>
                                <p className="m-0 p-0 w-100 h2">{Function.remplazarEspacios_(item.producto.substr(0, 12))}</p>
                            </div>
                        </div>
                    )
                })}

                <div className="animacion-top">
                    <img src={lugar != 3 ? _top : ''} height="400" />
                </div>
            </div>
        );
    }

    hangleTarjeta(i, usuario, tipo) {
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
                <p className="m-0 p-0 w-100 h1">{i ? i : ''} {usuario.nombres.split(' ')[0]} {usuario.apellidos.split(' ')[0].substr(0, 1)}.</p>
                <p className="m-0 p-0 w-100 h1">{tipo} {Function.commaSeparateNumber(Math.round(usuario.indicador))}</p>
            </div>
        )
    }
}

export default Top;