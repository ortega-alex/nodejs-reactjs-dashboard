import React, { Component } from 'react';

import Target from '../../../_helpers/Target';
import Function from '../../../_helpers/Function';

class Top extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { top, lugar } = this.props;
        return (
            <div className="row">
                {top && top.map((item, i) => {
                    return (
                        <div className="col-md-4" key={i}>
                            <div style={{ height: '77%' }}>
                                <Target
                                    lugar={lugar}
                                    tipo="Q"
                                    usuario={item}
                                    descripcion={(lugar != 3) ? (i + 1) + 'lugar' : undefined}
                                />
                            </div>
                            <div className="text-center" style={{ height: '19%' }}>
                                <p className="m-0 p-0 w-100 h1">{item.nombres_super.split(' ')[0]} {item.apellidos_super.split(' ')[0]}</p>
                                <p className="m-0 p-0 w-100 h1">{Function.remplazarEspacios_(item.producto)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Top;