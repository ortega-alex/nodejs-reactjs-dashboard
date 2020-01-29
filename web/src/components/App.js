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
class App extends Component {

  constructor() {
    super();
    this.state = {
      cargando: true,
      login: undefined,
      tema: undefined,
      color_tema: 'black'
    }
  }

  componentWillMount() {
    this.comprobarSesion();
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

    socket.on("tema", (values) => {
      this.setState({ tema: values.tema, color_tema: values.color_tema });
      AsyncStorage.getItem('menu_dashborad', (err, res) => {
        if (!err && res && res != "undefined") {
          var menu = JSON.parse(res);
          menu.tema = values.tema;
          menu.color_tema = values.color_tema;
          AsyncStorage.setItem('menu_dashborad', JSON.stringify(menu));
        } else {
          const menu = {tema: values.tema, color_tema: values.color_tema};
          AsyncStorage.setItem('menu_dashborad', JSON.stringify(menu));
        }
      });
    });
  }

  render() {
    const { cargando, login, tema, color_tema } = this.state;
    return (
      <Provider store={store}>
        <div style={styles.component}>
          <div style={{
            display: 'flex', height: '100vh', width: '100%', overflow: 'hidden',
            justifyContent: 'center',
            backgroundImage: 'url(' + _server._url + _server._port + '/img/' + tema + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            overflow: 'hidden',
            color: color_tema
          }}>
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