import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Menu as MenuAntd, Button, Switch, Icon, Tooltip } from 'antd';
import { CirclePicker } from 'react-color';
import { AsyncStorage } from 'AsyncStorage';

import UserActions from '../../_actions/user.actions';
import Indicador from '../indicador/indicador.component';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: '/',
            collapsed: true,
            cargando: false,
            background: '',
            color: '',
            colors: false,
            colors_default: [
                "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
                "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b",
                "#000000", "#FFFFFF", "#ff9800", "#ff5722", "#795548", "#607d8b"]
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('menu_dashborad', (err, res) => {
            if (!err && res) {
                var menu = JSON.parse(res);
                if (menu.background && menu.color) {
                    this.setState({ background: menu.background, color: menu.color });
                }
            }
        });
    }

    render() {
        const { pathname, collapsed, cargando, background, colors, color } = this.state;
        return (
            <HashRouter>
                <MenuAntd
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    style={{ backgroundColor: background, height: '100%', maxWidth: '20%' }}
                    inlineCollapsed={collapsed}
                >
                    <MenuAntd.Item key="0" onClick={this.toggleCollapsed} style={{ color: color }}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        <span style={styles.title}> Menú Principal  </span>
                    </MenuAntd.Item>

                    <MenuAntd.Item key="/">
                        <Link to="/" onClick={() => { this.setState({ pathname: "/" }) }} style={{ color: color }}>
                            <Icon type="pie-chart" />
                            <span>Indicadores</span>
                        </Link>
                    </MenuAntd.Item>

                </MenuAntd>

                {this.state.collapsed == false &&
                    <div style={styles.botonera}>
                        <div className="row mb-1">
                            {colors &&
                                <div className="col-6">
                                    <h6 className="text-center">Fondo</h6>
                                    <CirclePicker
                                        onChangeComplete={this.handleChangeComplete}
                                        colors={this.state.colors_default}
                                    />
                                    <h6 className="text-center">Texto</h6>
                                    <CirclePicker
                                        onChangeComplete={this.handleChangeCompleteColor}
                                        colors={this.state.colors_default}
                                    />
                                </div>
                            }
                        </div>
                        <div className="row text-center">
                            <div className="col-6">
                                <Switch
                                    onChange={() => this.setState({ colors: !colors })}
                                    checkedChildren="Cerrar"
                                    unCheckedChildren="Tema"
                                />
                            </div>
                            {!colors &&
                                <div className="col-6">
                                    <Tooltip title="Cerrar Sesión" style={{ marginLeft: '1%' }}>
                                        <Button disabled={cargando} type="primary" onClick={() => { this.cerrarSession() }}>
                                            <Icon type="logout" />
                                        </Button>
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    </div>
                }

                <Route path="/" exact component={Indicador} />
            </HashRouter>
        );
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    cerrarSession() {
        this.props.dispatch(UserActions.logout());
    }

    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
        var menu = { color: this.state.color, background: color.hex };
        AsyncStorage.setItem('menu_dashborad', JSON.stringify(menu));
    };

    handleChangeCompleteColor = (color, event) => {
        this.setState({ color: color.hex });
        var menu = { background: this.state.background, color: color.hex };
        AsyncStorage.setItem('menu_dashborad', JSON.stringify(menu));
    };
}

const styles = {
    menu: { height: '100%', maxWidth: '20%', backgroundColor: '#ff5722' },
    title: { margin: 'auto', fontSize: 14, fontWeight: 'bold' },
    botonera: {
        position: 'absolute',
        bottom: '5%',
        left: '1%'
    },
    colunm: { display: 'flex', flex: 1, flexDirection: 'colunm', width: '50%' }
}

export default Menu;