import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'AsyncStorage';
import io from 'socket.io-client';
import { Drawer } from 'antd';

import Supervisor from './supervisor.component';
import Gestor from './gestor.component';
import _server from '../../_services/server.services';

const socket = io(_server._url + _server._port);

class Indicador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            vista: undefined,
            id_supervisor: undefined,
            _message: null,
            visible: false,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('login_dashboard', (err, res) => {
            if (!err && res && res != "undefined") {
                const user = JSON.parse(res);
                this.setState({ user }, () => this.handleGetIndicadores());

                socket.on(user.id_usuario.toString(), (res) => {
                    this.handleDrawer(res);
                });

                socket.on("todos", (res) => {
                    this.handleDrawer(res);
                });
            }
        });


    }

    render() {
        const { user, vista, id_supervisor, _message, visible } = this.state;
        return (
            <div>
                {(user && vista == 1) &&
                    <Supervisor user={user} changeView={this.handleChangeView.bind(this)} />
                }

                {(user && vista == 0) &&
                    <Gestor id_supervisor={id_supervisor} changeView={this.handleChangeView.bind(this)} />
                }

                <Drawer
                    placement="bottom"
                    closable={false}
                    onClose={() => { this.setState({ visible: false }); }}
                    visible={visible}
                    height='80%'
                >
                    <div className="drawer-style">
                        <div id="titles">
                            <div id="titlecontent">
                                <p className="center">{_message}</p>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }

    handleGetIndicadores() {
        const { user } = this.state;
        this.setState({ vista: user.cargo, id_supervisor: user.id_usuario });
    }

    handleChangeView(vista, id_supervisor = undefined) {
        this.setState({ vista, id_supervisor });
    }

    handleDrawer(res) {
        var tiempo = (res.tiempo == 0) ? res.duracion * 60000 : res.duracion * 1000;
        this.setState({ _message: res.mensaje, visible: true }, () => {
            setTimeout(() => {
                this.setState({ visible: false });
            }, tiempo);
        });
    }
}

export default connect()(Indicador);