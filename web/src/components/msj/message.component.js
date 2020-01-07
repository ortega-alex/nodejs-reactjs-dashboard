import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button, Switch, Tooltip, Icon, Input, InputNumber, message } from 'antd';
import io from 'socket.io-client';

import _server from '../../_services/server.services';
import IndicadorActions from '../../_actions/indicador.actions';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const socket = io(_server._url + _server._port);

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frm_activo: true,
            todos: true,
            title: 'Envia a todos los destinatarios!'
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getSupervisores());
    }

    render() {
        const { supervisores } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { todos, title, frm_activo } = this.state;
        return (
            <div className="container pt-3">
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center">
                        <h3>Mensajes</h3>
                        <p className="p-0 m-0">Permite la transmision de mensajes instantaneos a todos o a un televisor conectado</p>
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2 bordered">
                        <Form ref={ref => this.formulario = ref} onSubmit={this.handleEnviarMsj.bind(this)}>
                            <div className="row">
                                <div className="col-10">
                                    <Item label="Destinatario">
                                        {getFieldDecorator('supervisores', {
                                            rules: [{ required: !todos, message: 'Por favor seleccione el destinatario!' }],
                                        })(
                                            <Select
                                                disabled={todos}
                                                mode="multiple"
                                                placeholder="Seleccione el destinatario"
                                                showSearch
                                                autoClearSearchValue
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {supervisores && supervisores.map((res, i) => {
                                                    return (
                                                        <Option key={i} value={res.id_supervisor}>{`${res.primer_nombre} ${res.primer_apellido} | ${res.departamento}`}</Option>
                                                    );
                                                })}
                                            </Select>
                                        )}
                                    </Item>
                                </div>
                                <div className="col-2 pt-5">
                                    <Switch
                                        checkedChildren={<Tooltip title={title}> Todos <Icon type="check" /> </Tooltip>}
                                        unCheckedChildren={<Tooltip title={title}> Todos <Icon type="close" /></Tooltip>}
                                        defaultChecked={frm_activo}
                                        onChange={(valor) => {
                                            this.setState({ frm_activo: valor, todos: !todos });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <Item label="Tiempo">
                                        {getFieldDecorator('tiempo', {
                                            rules: [{ required: true, message: 'Por favor seleccione una opcion!' }],
                                            initialValue: 0
                                        })(
                                            <Select
                                                placeholder="Seleccione una opcion"
                                                showSearch
                                                autoClearSearchValue
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value={0}>Minutos</Option>
                                                <Option value={1}>Segundos</Option>
                                            </Select>
                                        )}
                                    </Item>
                                </div>
                                <div className="col-md-2">
                                    <Item label="Duracion">
                                        {getFieldDecorator('duracion', {
                                            initialValue: (5),
                                            rules: [{ required: true, message: 'Por favor indica un tiempo!' }]
                                        })(
                                            <InputNumber className="input" min={1} placeholder="Duracion" />
                                        )}
                                    </Item>
                                </div>
                            </div>
                            <Item label="Mensaje">
                                {getFieldDecorator('mensaje', {
                                    rules: [{ required: true, message: 'Por favor ingrese el mensaje!' }]
                                })(
                                    <TextArea rows={10} placeholder="Ingrese el mensaje" maxLength="600" />
                                )}
                            </Item>
                            <Button type="primary" htmlType="submit" block>
                                Enviar
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    handleEnviarMsj(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { todos } = this.state;
                if (todos) {
                    socket.emit('enviar-a-todos', values);
                } else {
                    socket.emit('individual', values);
                }
                message.success("Mensaje enviado correctamente");
                this.setState({ frm_activo: true });
                this.props.form.resetFields();
            }
        });
    }
}

function mapStateToProps(state) {
    const { _indicador } = state;
    const { supervisores } = _indicador;
    return { supervisores };
}

export default connect(mapStateToProps)(Form.create()(Message));