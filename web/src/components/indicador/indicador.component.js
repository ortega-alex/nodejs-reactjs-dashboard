import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'AsyncStorage';
import io from 'socket.io-client';
import { Drawer } from 'antd';
import YouTube from 'react-youtube';

import Supervisor from './supervisor.component';
import Gestor from './gestor.component';
import _server from '../../_services/server.services';

const socket = io(_server._url + _server._port);
const _width = window.innerWidth;
const _height = window.innerHeight;

class Indicador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            vista: undefined,
            supervisor: undefined,
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
        const { vista, supervisor, _message, visible } = this.state;
        const opts = {
            height: (_height) ? (_height - (_height / 3)) : 500, //window.innerHeight - (window.innerHeight / 3),
            width: (_width) ? (_width - 50) : 1200, //window.innerWidth - 50,
            playerVars: {
                autoplay: 1,
                controls: 0
            }
        };
        return (
            <div>
                {(vista == 1) &&
                    <Supervisor changeView={this.handleChangeView.bind(this)} />
                }

                {(supervisor && vista == 0) &&
                    <Gestor supervisor={supervisor} changeView={this.handleChangeView.bind(this)} />
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

                    {/* <YouTube
                        videoId="Zx2Nn2T_ATU"
                        opts={opts}
                        onReady={(event) => {
                            event.target.setVolume(100);
                            event.target.playVideo();
                        }}
                        onPlaybackQualityChange={(event) => { console.log('onPlaybackQualityChange', event) }}
                        onStateChange={(event) => {
                            var duracion = event.target.getDuration();
                            setTimeout(() => {
                                this.setState({ visible: false });
                            }, duracion * 1000);
                        }}
                        onError={(event) => { console.log('onError', event) }}
                    /> */}
                </Drawer>
            </div>
        );
    }

    handleGetIndicadores() {
        const { user } = this.state;
        this.setState({ vista: user.cargo, supervisor: user });
    }

    handleChangeView(vista, supervisor = undefined) {
        this.setState({ vista, supervisor });
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