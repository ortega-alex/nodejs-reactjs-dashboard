import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Tooltip } from 'antd';

import IndicadorActions from '../../_actions/indicador.actions';
import Function from '../../_helpers/Function';

const _height = (window.innerHeight < 500) ? (window.innerHeight / 2) : (window.innerHeight / 4);

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
            <div className="p-3">
                <div className="row" style={{ height: window.innerHeight, overflowY: 'auto' }}>
                    {supervisores && supervisores.map((res, i) => {
                        return (
                            <div className="col-md-3 m-0 p-0" key={i}>
                                <div className={`target ${Function.getFondo(res.meta <= 33 ? 3 : (res.meta <= 66 ? 2 : 1))}`}>
                                    <img
                                        height={((_height / 2) + 60)}
                                        width={((_height / 2)) + 60}
                                        src={Function.getImage(res.foto)}
                                        className="avatar"
                                        alt="Sin Imagen"
                                        onClick={() => this.props.changeView(0, res)}
                                    />
                                    <Icon type="zoom-in" className="icon-target" onClick={() => this.props.changeView(0, res)} />
                                    <p className="h6 m-0 p-0 w-100">{res.primer_nombre + ' ' + res.primer_apellido}</p>
                                    <p className="m-0 p-0 w-100">{res.departamento}</p>
                                    <div className="row text-center m-4">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <b>Generación</b>
                                                </div>
                                                <div className="col-12">
                                                    Q {Function.commaSeparateNumber(res.generacion)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <b>Recuperación</b>
                                                </div>
                                                <div className="col-12">
                                                    <Tooltip title={'Porcentage de meta: ' + parseInt(res.meta) + '%'}>
                                                        Q {Function.commaSeparateNumber(res.recuperacion)}
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