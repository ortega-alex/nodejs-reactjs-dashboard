import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'AsyncStorage';
import io from 'socket.io-client';
import { Drawer } from 'antd';
import YouTube from 'react-youtube';
import { Player } from 'video-react';

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
            tipo_mensaje: undefined,
            _timer: undefined
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
        const { vista, supervisor, _message, visible, tipo_mensaje } = this.state;
        const opts = {
            height: (_height) ? (_height - (_height / 3)) : 500,
            width: (_width) ? (_width - 50) : 1200,
            playerVars: {
                autoplay: 1,
                controls: 0
            }
        };
        return (
            <div className="container">
                {(vista == 1) &&
                    <Supervisor changeView={this.handleChangeView.bind(this)} />
                }

                {(supervisor && vista == 0) &&
                    <Gestor supervisor={supervisor} changeView={this.handleChangeView.bind(this)} />
                }

                <Drawer
                    placement="bottom"
                    closable={false}
                    onClose={this.handleDrawerClose.bind(this)}
                    visible={visible}
                    height='80%'
                >
                    {tipo_mensaje == 1 &&
                        <div className="drawer-style">
                            <div id="titles">
                                <div id={_message.length < 300 ? 'titlecontent-menor' : 'titlecontent'}>
                                    <p className="center">{_message}</p>
                                </div>
                            </div>
                        </div>
                    }

                    {tipo_mensaje == 2 &&
                        <YouTube
                            videoId={_message}
                            opts={opts}
                            onReady={(event) => {
                                event.target.setVolume(100);
                                event.target.playVideo();
                            }}
                            onPlaybackQualityChange={(event) => { console.log('onPlaybackQualityChange', event) }}
                            onStateChange={(event) => {
                                var duracion = event.target.getDuration();
                                this.setState({
                                    _timer: setTimeout(() => {
                                        this.handleDrawerClose();
                                    }, duracion * 1000)
                                });
                            }}
                            onError={(event) => { console.log('onError', event) }}
                        />
                    }

                    {tipo_mensaje == 3 &&
                        <div style={{ margin: '0px 20%' }}>
                            <Player
                                autoPlay
                            >
                                <source id="myVideo" src={_message} />
                            </Player>
                            <video id="mytest" controls style={{ display: 'none' }}>
                                <source src={_message} />
                            </video>
                        </div>
                    }
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
        this.handleDrawerClose();
        const { tipo, duracion, mensaje, tiempo } = res;
        if (tipo == 0) {
            var _tiempo = (tiempo == 0) ? duracion * 60000 : duracion * 1000;
            this.setState({ _message: mensaje, visible: true, tipo_mensaje: 1 }, () => {
                this.setState({
                    _timer: setTimeout(() => {
                        this.handleDrawerClose();
                    }, _tiempo)
                });
            });
        }

        if (tipo == 1) {
            var mp3 = res.mensaje.indexOf('mp3');
            var mp4 = res.mensaje.indexOf('mp4');
            if (mp3 !== -1 || mp4 !== -1) {
                var url = _server._url + _server._port + '/videos/' + mensaje;
                this.setState({ _message: url, visible: true, tipo_mensaje: 3 }, () => {
                    setTimeout(() => {
                        var vid = document.getElementById("mytest");
                        if (vid.duration) {
                            this.setState({
                                _timer: setTimeout(() => {
                                    this.handleDrawerClose();
                                }, vid.duration * 1000)
                            });
                        } else {
                            this.handleDrawerClose();
                        }
                    }, 2000);
                });
            } else {
                var arr = mensaje.split('=');
                this.setState({ _message: arr[1], visible: true, tipo_mensaje: 2 });
            }
        }
    }

    handleDrawerClose() {
        clearTimeout(this.state._timer);
        this.setState({ visible: false, tipo_mensaje: undefined, mensaje: undefined });
    }
}

export default connect()(Indicador);