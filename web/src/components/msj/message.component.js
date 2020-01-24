import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button, Switch, Tooltip, Icon, Input, InputNumber, message, Upload } from 'antd';
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
            title: 'Envia a todos los destinatarios!',
            tipo: 0,
            file: null,
            subiendo: false
        };
    }

    componentDidMount() {
        this.props.dispatch(IndicadorActions.getSupervisores());
    }

    render() {
        const { supervisores } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { todos, title, frm_activo, tipo, subiendo } = this.state;
        const propsUpload = {
            disabled: subiendo,
            onChange: info => {
                if (info.file.status == 'done') {
                    this.props.form.setFieldsValue({
                        ['mensaje']: info.file.response.name, subiendo
                    });
                    this.setState({ subiendo: false });
                }
                if (info.file.status == 'uploding') {
                    this.setState({ subiendo: true });
                }
                if (info.file.status == 'error') {
                    message.error('Es permitido solo formatos mp4 o mp3');
                    this.setState({ subiendo: false });
                }
            },
            multiple: false,
            className: 'upload-list-inline',
            name: 'file',
            action: `${_server._url}${_server._port}/api/multimedia/uploadVideo`
        };

        return (
            <div className="container pt-3" style={{height: '100%', overflowY: 'auto'}}>
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

                            <Item label="Tipo de mensaje">
                                {getFieldDecorator('tipo', {
                                    rules: [{ required: true, message: 'Por favor seleccione una opcion!' }],
                                    initialValue: tipo
                                })(
                                    <Select
                                        placeholder="Seleccione el tipo de mensaje"
                                        showSearch
                                        autoClearSearchValue
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={(value) => { this.setState({ tipo: value }) }}
                                    >
                                        <Option value={0}>Texto</Option>
                                        <Option value={1}>Video</Option>
                                    </Select>
                                )}
                            </Item>

                            <div className="row">
                                <div className="col-md-10">
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
                                <div className="col-md-2 pt-5">
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
                            {tipo == 0 &&
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
                            }

                            {tipo == 1 &&
                                <div className="row">
                                    <div className="col-md-4 offset-md-8 text-right">
                                        <Tooltip className="ml-1" title="Permite el ingreso de conto y venta por medio de un archivo xsl al sistema">
                                            <Upload {...propsUpload}>
                                                <Button
                                                    type="default"
                                                    className="bg-info text-white btn-block"
                                                    htmlType="button"
                                                >
                                                    <Icon type="upload" /> Video
                                                </Button>
                                            </Upload>
                                        </Tooltip>
                                    </div>
                                </div>
                            }

                            <Item label="Mensaje">
                                {getFieldDecorator('mensaje', {
                                    rules: [{ required: true, message: 'Por favor ingrese el mensaje!' }]
                                })(
                                    tipo == 0 ? <TextArea rows={10} placeholder="Ingrese el mensaje" maxLength="600" />
                                        : <Input type="text" placeholder="Ingrese una url valida" />
                                )}
                            </Item>

                            <Button type="primary" htmlType="submit" block disabled={subiendo}>
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