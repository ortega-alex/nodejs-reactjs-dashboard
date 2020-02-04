import React, { Component } from 'react';
import { Form, Button } from 'antd';
import io from 'socket.io-client';

import _server from '../../_services/server.services';

const { Item } = Form;
const socket = io(_server._url + _server._port);

class Transicion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="pt-3" style={styles.component}>
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
                                <div className="col-md-4 offsset-md-8">
                                    <Button type="primary" block>
                                        Remover tema
                                    </Button>
                                </div>
                            </div>
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

            }
        });
    }
}

const styles = {
    component: { height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#e0e0e0', position: 'relative' }
}

export default Form.create()(Transicion);