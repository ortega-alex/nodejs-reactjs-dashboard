import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Divider, Select, message } from 'antd';
import io from 'socket.io-client';

import _server from '../../_services/server.services';
import ConfigActions from '../../_actions/config.actions';
import IndicadorActions from '../../_actions/indicador.actions';

const { Item } = Form;
const { Option } = Select;
const socket = io(_server._url + _server._port);

class Asignacion extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(ConfigActions.getTvs());
        this.props.dispatch(IndicadorActions.getSupervisores());
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tvs, supervisores } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <p className="m-0 p-0 h3">Asignacion por televicion</p>
                        <p className="p-0 m-0">Permite asignar supervisor a un televisor conectado</p>
                        <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3 bordered">
                        <Form ref={ref => this.formulario = ref} onSubmit={this.handleEnviar.bind(this)}>

                            <Divider orientation="left">Seleccione el televisor y el supervisor a asignar</Divider>

                            <Item label="Televisor">
                                {getFieldDecorator('id_tv', {
                                    rules: [{ required: true, message: 'Por favor seleccione una opcion!' }],
                                    initialValue: undefined
                                })(
                                    <Select
                                        placeholder="Seleccione un televisor"
                                        showSearch
                                        autoClearSearchValue
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {tvs && tvs.map((item, i) => {
                                            return (
                                                <Option key={i} value={item.id_tv}>{item.nombre}</Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </Item>

                            <Item label="Supervisor">
                                {getFieldDecorator('id_usuario', {
                                    rules: [{ required: true, message: 'Por favor seleccione el destinatario!' }],
                                })(
                                    <Select
                                        placeholder="Seleccione el destinatario"
                                        showSearch
                                        autoClearSearchValue
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {supervisores && supervisores.map((res, i) => {
                                            return (
                                                <Option key={i} value={res.id_usuario}>{`${res.primer_nombre} ${res.primer_apellido} | ${res.departamento}`}</Option>
                                            );
                                        })}
                                    </Select>
                                )}
                            </Item>

                            <Button htmlType="submit" type="primary" block>
                                Enviar
                            </Button>
                        </Form>
                    </div>
                </div>
            </div >
        );
    }

    handleEnviar(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                socket.emit('asignacion-usuario', values);
                message.success("Asignación enviado correctamente");
                this.props.form.resetFields();
            }
        });
    }
}

function mapStateToProps(state) {
    const { _config, _indicador } = state;
    const { tvs } = _config;
    const { supervisores } = _indicador;
    return { tvs, supervisores };
}

export default connect(mapStateToProps)(Form.create()(Asignacion));