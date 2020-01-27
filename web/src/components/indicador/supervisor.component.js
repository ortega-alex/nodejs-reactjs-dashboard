import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Tooltip } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';

class Supervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getSupervisores());
    }

    render() {
        const { supervisores } = this.props;
        return (
            <div>
                {/* <div className="row">
                    Menu
                </div> */}
                <div className="row" style={{ overflowY: 'auto' }}>
                    {supervisores && supervisores.map((res, i) => {
                        return (
                            <div className="col-md-3 m-0 p-0" key={i}>
                                <div className={`target ${Function.getFondo(res.meta <= 33 ? 3 : (res.meta <= 66 ? 2 : 1))}`}>
                                    <img
                                        height="120"
                                        width="120"
                                        src={Function.getImage(res.foto)}
                                        className="avatar"
                                        alt="Sin Imagen"
                                        onClick={() => this.props.changeView(0, res)}
                                    />
                                    <Icon type="zoom-in" className="icon-target" onClick={() => this.props.changeView(0, res)} />
                                    <p className="m-0 p-0 w-100 h5">{res.primer_nombre + ' ' + res.primer_apellido}</p>
                                    <p className="m-0 p-0 w-100 h6">{res.departamento}</p>
                                    <div className="row text-center">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="m-0 p-0"><b>Generación</b></p>
                                                </div>
                                                <div className="col-12">
                                                    <p className="m-0 p-0">Q {Function.commaSeparateNumber(res.generacion)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="m-0 p-0"><b>Recuperación</b></p>
                                                </div>
                                                <div className="col-12">
                                                    <Tooltip title={'Porcentage de meta: ' + parseInt(res.meta) + '%'}>
                                                        <p className="m-0 p-0">Q {Function.commaSeparateNumber(res.recuperacion)}</p>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { supervisores } = _indicador;
    return { supervisores };
}

export default connect(mapStateToProps)(Supervisor);