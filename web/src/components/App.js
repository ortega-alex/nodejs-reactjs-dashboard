import React, { Component } from 'react';
import { AsyncStorage } from 'AsyncStorage';
import store from './ConfigureStore';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import Loading from '../_helpers/Loading';
import Login from './login/login.component';
import Menu from './menu/menu.component';
import _server from '../_services/server.services';

const socket = io(_server._url + _server._port);
var thema = undefined;
var color_thema = 'balck';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cargando: true,
      login: undefined,
      thema: undefined
    }
  }

  componentWillMount() {
    this.comprobarSesion();
    AsyncStorage.getItem('menu_dashborad', (err, res) => {
      if (!err && res && res != "undefined") {
        var menu = JSON.parse(res);
        if (menu.thema && menu.thema != null) {
          thema = menu.thema;
        }
        if (menu.color && menu.color_thema != null) {
          color_thema = menu.color_thema;
        }
      }
    });
  }

  render() {
    const { cargando, login } = this.state;
    return (
      <Provider store={store}>
        <div style={thema ? styles.thema : styles.component}>
          {(cargando == true) &&
            <div style={styles.fondo}>
              <Loading />
            </div>
          }
          {(login == true) &&
            <Menu />
          }
          {(login == false) &&
            <Login />
          }
        </div>
      </Provider>
    );
  }

  async comprobarSesion() {
    AsyncStorage.getItem('login_dashboard', (err, res) => {
      if (!err && res && res != "undefined") {
        this.setState({ login: true, cargando: false });
      } else {
        this.setState({ login: false, cargando: false });
      }
    });
  }
}

const styles = {
  component: { display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#e0e0e0' },
  thema: {
    display: 'flex', height: '100vh', width: '100%', overflow: 'hidden',
    justifyContent: 'center',
    backgroundImage: `url(${_server._url + _server._port}/img/${thema})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
    color: color_thema
  },
  fondo: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    overflow: 'hidden',
  }
}

export default App;