import React, { Component } from 'react';
import { Form, Button, Tooltip, Icon, Input, message, Upload } from 'antd';
import io from 'socket.io-client';
import { CirclePicker } from 'react-color';
import { AsyncStorage } from 'AsyncStorage';

import _server from '../../_services/server.services';

const { Item } = Form;
const socket = io(_server._url + _server._port);

class Tema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subiendo: false,
            tema: undefined,
            color_tema: 'black',
            colors_default: [
                "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
                "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b",
                "#000000", "#FFFFFF", "#ff9800", "#ff5722", "#795548", "#607d8b"
            ],
            id_usuario: undefined
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('menu_dashborad', (err, res) => {
            if (!err && res && res != "undefined") {
                var menu = JSON.parse(res);
                if (menu.tema && menu.tema != null) {
                    this.setState({ tema: menu.tema });
                }
                if (menu.color_tema && menu.color_tema != null) {
                    this.setState({ color_tema: menu.color_tema });
                }
            }
        });
        AsyncStorage.getItem('login_dashboard', (err, res) => {
            if (!err && res && res != "undefined") {
                const user = JSON.parse(res);
                this.setState({ id_usuario: user.id_usuario });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { subiendo, tema, color_tema, colors_default, id_usuario } = this.state;
        const propsUpload = {
            disabled: subiendo,
            onChange: info => {
                if (info.file.status == 'done') {
                    this.props.form.setFieldsValue({
                        ['imagen']: info.file.response.name, subiendo
                    });
                    this.setState({ subiendo: false, tema: info.file.response.name });
                }
                if (info.file.status == 'uploding') {
                    this.setState({ subiendo: true });
                }
                if (info.file.status == 'error') {
                    message.error('Es permitido solo formatos png o jpg');
                    this.setState({ subiendo: false });
                }
            },
            multiple: false,
            className: 'upload-list-inline',
            name: 'file',
            action: `${_server._url}${_server._port}/api/multimedia/upload_img`,
            accept: ".jpg,.png"
        };

        return (
            <div className="pt-3" style={styles.component}>
                <div style={{
                    height: '100vh', width: '100%', overflow: 'hidden',
                    justifyContent: 'center',
                    backgroundImage: 'url(' + _server._url + _server._port + '/img/' + tema + ')',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    color: color_tema,
                }}>

                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <p className="m-0 p-0 h3">Configuración de tema</p>
                            <p className="p-0 m-0">Permite configurar un tema y ser trasmitido a todos los televisor conectado</p>
                            <br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-3 bordered">
                            <Form ref={ref => this.formulario = ref} onSubmit={this.handleEnviar.bind(this)}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <Item label="Imagen">
                                            {getFieldDecorator('imagen', {
                                                rules: [{ required: true, message: 'Por favor ingrese el nombre de la imagen o carge una!' }]
                                            })(
                                                <Input
                                                    type="text"
                                                    placeholder="Ingrese el nombre del tema o carge uno"
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        this.setState({ tema: value });
                                                    }}
                                                />
                                            )}
                                        </Item>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <Tooltip className="ml-1" title="Permite cartgar un tema al sistema">
                                            <Upload {...propsUpload}>
                                                <Button
                                                    type="default"
                                                    className="bg-info text-white btn-block"
                                                    htmlType="button"
                                                >
                                                    <Icon type="upload" /> Cargar tema
                                                </Button>
                                            </Upload>
                                        </Tooltip>
                                    </div>
                                </div>
                                <p className="m-0 p-0"><b>Color del texto:</b></p>
                                <div className="row p-2 m-1 text-center" style={{ backgroundColor: '#e0e0e0' }}>
                                    <div className="col-8">
                                        <CirclePicker
                                            onChangeComplete={(color) => {
                                                const { hex } = color;
                                                this.setState({ color_tema: hex });
                                            }}
                                            colors={colors_default}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: color_tema,
                                            color: color_tema,
                                            border: 'solid 1px black'
                                        }}>Color</div>
                                    </div>
                                </div>
                                <br />
                                <br />
                            </Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <Button type="primary" block disabled={subiendo} onClick={this.handleEnviar.bind(this)}>
                                        Enviar
                                    </Button>
                                </div>
                                <div className="col-md-6">
                                    <Button type="danger" block disabled={subiendo} onClick={this.handleRemoverTema.bind(this)}>
                                        Remover tema
                                    </Button>
                                </div>
                            </div>
                            {(id_usuario && id_usuario == 2490) &&
                                <div className="row">
                                    <div className="col-md-4 offset-md-4">
                                        <br />
                                        <Button type="danger" block disabled={subiendo} onClick={this.handleUpdateSession.bind(this)}>
                                            actualizar sesion
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    handleEnviar(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { color_tema } = this.state;
                var data = {
                    tema: values.imagen,
                    color_tema
                };
                socket.emit('cambiar-tema', data);
                message.success("Tema enviado correctamente");
                this.props.form.resetFields();
            }
        });
    }

    handleRemoverTema() {
        var data = {
            tema: null,
            color_tema: 'black'
        };
        socket.emit('cambiar-tema', data);
        this.setState({ tema: undefined, color_tema: 'black' })
    }

    handleUpdateSession() {
        socket.emit('actualizar');
    }
}

const styles = {
    component: { height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#e0e0e0', position: 'relative' }
}

export default Form.create()(Tema);